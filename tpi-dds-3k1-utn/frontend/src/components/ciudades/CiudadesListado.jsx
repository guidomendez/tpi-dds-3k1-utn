import React, { useState } from "react";
import Actualizar from "./CiudadesActualizar";
import servicios from "../../services/ciudades.services";
import "bootstrap/dist/css/bootstrap.css";

export default function CiudadesListado({
  data,
  onDelete,
  loadData,
  nombre,
  setFiltroNombreCiudad,
  handleSearch,
  activarRegistro,
}) {
  const [action, setAction] = useState("C");
  const [ciudad, setCiudad] = useState([]);

  const onGuardarActualizacion = async (data) => {
    await servicios.updateCiudad(ciudad.id_ciudad, data);
    setAction("C");
    loadData();
  };

  const onActualizar = (id_ciudad) => {
    loadId(id_ciudad);
    setAction("A");
  };

  const onVolver = () => {
    setAction("C");
  };

  const loadId = async (id_ciudad) => {
    const ciudad = await servicios.getCiudadesByID(id_ciudad);
    setCiudad(ciudad);
  };

  const tbody = data.map((ciudad) => (
    <tr key={ciudad.id_ciudad}>
      <td>{ciudad.nombre}</td>
      <td>
        <button className="btn btn-primary" onClick={() => onActualizar(ciudad.id_ciudad)}>
          <i className="fa-solid fa-pen"></i> 
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(ciudad.id_ciudad)}>
          <i className="fa-solid fa-trash"></i> 
        </button>
      </td>
    </tr>
  ));
  

  return (
    <>
      {action === "A" && (
        <Actualizar ciudad={ciudad} onGuardarActualizacion={onGuardarActualizacion} onVolver={onVolver} />
      )}
      {action === "C" && (
        <div>
          <div className="mt-4">
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control rounded-start"
                  value={nombre}
                  onChange={(e) => setFiltroNombreCiudad(e.target.value)}
                  placeholder="Buscar por nombre"
                />
                <button className="btn btn-primary rounded-end ms-2" onClick={handleSearch}>
                  Filtrar
                </button>
                <div className="card-footer d-flex justify-content-end">
                  <button className="btn btn-success ms-4" onClick={activarRegistro}>
                    Agregar ciudad
                  </button>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body p-2">
                  <table className="table table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Nombre Ciudad</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
