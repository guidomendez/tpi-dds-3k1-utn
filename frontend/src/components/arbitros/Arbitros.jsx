import { useEffect, useState } from "react";
import ArbitrosListado from "./ArbitrosListado.jsx";
import servicios from "../../services/arbitros.services";
import Registro from "./ArbitrosRegistro.jsx";

export default function Arbitros() {
  const [data, setData] = useState([]);
  const [nombre, setFiltroNombreArbitro] = useState('');
  const [action, setAction] = useState("C");

  const loadData = async () => {
    const data = await servicios.getArbitros();
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      try {
        await servicios.deleteArbitro(id);
        loadData();
      } catch (error) {
        alert(
          "Hubo un error al intentar eliminar el árbitro. Por favor, intenta de nuevo."
        );
      }
    }
  };

  const handleSearch = async () => {
    if (nombre.trim() === "") {
      loadData(); // Si la caja de texto está vacía, recarga todos los árbitros
    } else {
      try {
        const data = await servicios.getArbitroByName(nombre);
        // Verifica si data es un objeto y lo convierte en un arreglo
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert("Hubo un error al intentar buscar el árbitro. Por favor, intenta de nuevo.");
      }
    }
  };

  async function onSubmit(data) {
    await servicios.postArbitro(data);
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
      <div className="container">
        <h1 className="text-center mt-4 mb-2">Árbitros</h1>
        {action === "C" && (
          <ArbitrosListado
            data={data}
            onDelete={onDelete}
            loadData={loadData}
            nombre={nombre}
            setFiltroNombreArbitro={setFiltroNombreArbitro}
            handleSearch={handleSearch}
            activarRegistro={activarRegistro}
          />
        )}
        {action === "R" && (
          <Registro
            onSubmit={onSubmit}
            activarConsulta={activarConsulta}
          />
        )}
      </div>
    </div>
  );
}
