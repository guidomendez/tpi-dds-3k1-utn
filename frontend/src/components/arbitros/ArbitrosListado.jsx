import React from "react";
import { useState } from "react";
import Actualizar from "./ArbitrosActualizar";
import servicios from "../../services/arbitros.services";
import "bootstrap/dist/css/bootstrap.css";

export default function ArbitrosListado({ data, loadData, onDelete, handleSearch, nombre, setFiltroNombreArbitro, activarRegistro }) {

  const [action, setAction] = useState("C");
  const [arbitro, setArbitro] = useState([]);

  const onGuardarActualizacion = async (data) => {
    const req = await servicios.updateArbitro(arbitro.id_arbitro, data);
    setAction("C");
    loadData();
  };

  const onVolver = () => {
    setAction("C");
  };

  const onActualizar = (id_arbitro) => {
    loadId(id_arbitro);
    setAction("A");
  };

  const loadId = async (id_arbitro) => {
    const arbitro = await servicios.getArbitrosByID(id_arbitro);
    setArbitro(arbitro);
  };

  const tbody = data.map((arbitro) => (
    <tr key={arbitro.id_arbitro}>
      <td>{arbitro.nombre_arbitro}</td>
      <td>{arbitro.fecha_nacimiento}</td>
      <td>
        <button className="btn btn-primary" onClick={() => onActualizar(arbitro.id_arbitro)}>
          <i className="fa-solid fa-pen"></i>
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(arbitro.id_arbitro)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      {action === "A" && (
        <>
          <Actualizar
            arbitro={arbitro}
            onGuardarActualizacion={onGuardarActualizacion}
            onVolver={onVolver}
          />
        </>
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
                  onChange={(e) => setFiltroNombreArbitro(e.target.value)}
                  placeholder="Buscar por nombre"
                />
                <button
                  className="btn btn-primary rounded-end ms-2"
                  onClick={handleSearch}
                >
                  Filtrar
                </button>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-success ms-4" onClick={activarRegistro}>
                    Agregar árbitro
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4 mb-4">
            <div className="card-body p-2">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nombre del Árbitro</th>
                    <th scope="col">Fecha Nacimiento</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{tbody}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { ArbitrosListado };
