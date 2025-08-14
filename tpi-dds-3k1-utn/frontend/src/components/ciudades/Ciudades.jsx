import React, { useState, useEffect } from "react";
import CiudadesListado from "./CiudadesListado";
import servicios from "../../services/ciudades.services";
import Registro from "./CiudadesRegistro";
import "bootstrap/dist/css/bootstrap.css";

export default function Ciudades() {
  const [data, setData] = useState([]);
  const [nombre, setFiltroNombreCiudad] = useState('');
  const [action, setAction] = useState("C");

  const loadData = async () => {
    const data = await servicios.getCiudades();
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      try {
        await servicios.deleteCiudad(id);
        loadData();
      } catch (error) {
        alert(
          "Hubo un error al intentar eliminar la ciudad. Por favor, intenta de nuevo."
        );
      }
    }
  };

  async function onSubmit(data) {
    await servicios.postCiudad(data);
    loadData();
    setAction("C");
  }

  const handleSearch = async () => {
    if (nombre.trim() === "") {
      loadData();
    } else {
      try {
        const data = await servicios.getCiudadByName(nombre);
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert("Hubo un error al intentar buscar la ciudad. Por favor, intenta de nuevo.");
      }
    }
  };

  const activarRegistro = () => {
    setAction("R");
  }

  function activarConsulta() {
    setAction("C");
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Ciudades</h1>
      {action === "C" && (
        <CiudadesListado
          data={data}
          loadData={loadData}
          onDelete={onDelete}
          handleSearch={handleSearch}
          nombre={nombre}
          setFiltroNombreCiudad={setFiltroNombreCiudad}
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
  );
}
