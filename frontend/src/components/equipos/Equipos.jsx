import { useEffect, useState } from "react";
import EquiposListado from "./EquiposListado";
import servicios from "../../services/equipos.services";
import EquiposRegistro from "./EquiposRegistro";

export default function Equipos() {
  const [data, setData] = useState([]);
  const [nombre, setFiltroNombreEquipo] = useState("");
  const [action, setAction] = useState("C");

  const loadData = async () => {
    const data = await servicios.getEquipos();
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      try {
        await servicios.deleteEquipo(id);
        loadData();
      } catch (error) {
        alert(
          "Hubo un error al intentar eliminar el Equipo. Por favor, intenta de nuevo."
        );
      }
    }
  };

  const handleSearch = async () => {
    if (nombre.trim() === "") {
      loadData(); // Si la caja de texto está vacía, recarga todos los árbitros
    } else {
      try {
        const data = await servicios.getEquipoByName(nombre);
        // Verifica si data es un objeto y lo convierte en un arreglo
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert(
          "Hubo un error al intentar buscar el árbitro. Por favor, intenta de nuevo."
        );
      }
    }
  };

  async function onSubmit(data) {
    await servicios.postEquipo(data);
    loadData();
    setAction("C");
  }

  function activarConsulta() {
    setAction("C"); // Establece la acción actual como Consulta
  }

  function activarRegistro() {
    setAction("R"); // Establece la acción actual como Registro
  }
  return (
    <div>
        <div className="container mt-4">
          <h1 className="text-center mt-4 mb-4">Equipos</h1>
          {action === "C" && (
            <EquiposListado
              data={data}
              onDelete={onDelete}
              loadData={loadData}
              nombre={nombre}
              setFiltroNombreEquipo={setFiltroNombreEquipo}
              handleSearch={handleSearch}
              activarRegistro={activarRegistro}
            />
          )}
          {action === "R" && (
            <EquiposRegistro
              onSubmit={onSubmit}
              activarConsulta={activarConsulta}
            />
          )}
        </div>
    </div>
  );
}
