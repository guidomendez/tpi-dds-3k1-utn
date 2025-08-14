import React, { useState } from "react";
import EstadiosActualizar from "./EstadiosActualizar";
import servicios from "../../services/estadios.services";
import "bootstrap/dist/css/bootstrap.css";

export default function EstadiosListado({
  loadData,
  data,
  ciudades,
  onDelete,
  activarRegistro,
  nombre,
  setFiltroNombreEstadio,
  handleSearch,
}) {
  const [action, setAction] = useState("Listado");
  const [estadio, setEstadio] = useState([]);

  const onGuardarActualizacion = async (data) => {
    const req = await servicios.updateEstadio(estadio.id_estadio, data);
    setAction("Listado");
    loadData();
  };

  const onVolver = () => {
    setAction("Listado");
  };

  const onActualizar = (id_estadio) => {
    loadId(id_estadio);
    setAction("Actualizar");
  };

  const loadId = async (id_estadio) => {
    const estadio = await servicios.getEstadiosbyId(id_estadio);
    setEstadio(estadio);
  };

  const tbody = data.map((estadio) => {
    // Buscar el nombre del ciudad por id_ciudad
    const ciudad = ciudades.find((ciudad) => ciudad.id_ciudad === estadio.id_ciudad);

    return (
      <tr key={estadio.id_estadio}>
        <td>{estadio.nombre_estadio}</td>
        <td>{ciudad ? ciudad.nombre : "Ciudad no encontrada"}</td>
        <td>{estadio.fecha_inauguracion}</td>
        <td>{estadio.capacidad}</td>
        <td>
          <button className="btn btn-primary" onClick={() => onActualizar(estadio.id_estadio)}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(estadio.id_estadio)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {action === "Actualizar" && (
        <EstadiosActualizar
          ciudades={ciudades}
          estadio={estadio}
          onGuardarActualizacion={onGuardarActualizacion}
          onVolver={onVolver}
        />
      )}
      {action === "Listado" && (
        <div>
          <div>
            <div className="mt-4">
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control rounded-start"
                    value={nombre}
                    onChange={(e) => setFiltroNombreEstadio(e.target.value)}
                    placeholder="Buscar por nombre"
                  />
                  <button
                    className="btn btn-primary rounded-end ms-2"
                    onClick={handleSearch}
                  >
                    Filtrar
                  </button>
                  <div>
                    <button className="btn btn-success ms-4" onClick={activarRegistro}>
                      Agregar estadio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body p-2"></div>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nombre del Estadio</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Fecha Inauguración</th>
                  <th scope="col">Capacidad</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{tbody}</tbody>
            </table>
          </div>
        </div>
      )
      }
    </>
  );
}

export { EstadiosListado };
