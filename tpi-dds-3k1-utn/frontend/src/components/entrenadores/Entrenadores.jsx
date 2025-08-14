import React, { useEffect, useState } from "react";
import EntrenadoresListado from "./EntrenadoresListado.jsx";
import servicios from "../../services/entrenadores.services";
import serviciosEquipos from "../../services/equipos.services";
import EntrenadoresRegistro from "./EntrenadoresRegistro.jsx";

export default function Entrenadores() {
  const [data, setData] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [nombre, setFiltroNombreEntrenador] = useState("");
  const [action, setAction] = useState("C");

  const loadData = async () => {
    const data = await servicios.getEntrenadores();
    setData(data);
  };

  const loadEquipos = async () => {
    const equipos = await serviciosEquipos.getEquipos();
    setEquipos(equipos);
  };

  useEffect(() => {
    loadData();
    loadEquipos();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      try {
        await servicios.deleteEntrenador(id);
        loadData();
        loadEquipos();
      } catch (error) {
        alert(
          "Hubo un error al intentar eliminar el entrenador. Por favor, intenta de nuevo."
        );
      }
    }
  };

  const handleSearch = async () => {
    if (nombre.trim() === "") {
      loadData(); // Si la caja de texto está vacía, recarga todos los entrenadores
    } else {
      try {
        const data = await servicios.getEntrenadorbyName(nombre);
        // Verifica si data es un objeto y lo convierte en un arreglo
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert(
          "Hubo un error al intentar buscar el entrenador. Por favor, intenta de nuevo."
        );
      }
    }
  };

  async function onSubmit(data) {
    await servicios.postEntrenador(data);
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
    <div className="container mt-4">
      <h1 className="text-center mt-4 mb-4">Entrenadores</h1>
        {action === "C" && (
          <EntrenadoresListado
            data={data}
            equipos={equipos}
            onDelete={onDelete}
            loadData={loadData}
            activarRegistro={activarRegistro}
            handleSearch={handleSearch}
            nombre={nombre}
            setFiltroNombreEntrenador={setFiltroNombreEntrenador}
          />
        )}
        {action === "R" && (
          <EntrenadoresRegistro
            onSubmit={onSubmit}
            activarConsulta={activarConsulta}
            equipos={equipos}
          />
        )}
    </div>
  );
}
