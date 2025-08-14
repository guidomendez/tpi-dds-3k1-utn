import React from "react";
import { useState } from "react";
import EquiposActualizar from "./EquiposActualizar";
import servicios from "../../services/equipos.services";
import "bootstrap/dist/css/bootstrap.css";

export default function EquiposListado({
  data,
  onDelete,
  nombre,
  setFiltroNombreEquipo,
  handleSearch,
  activarRegistro,
  loadData,
}) {

  const [action, setAction] = useState("C");
  const [equipo, setEquipo] = useState([]);

  const onGuardarActualizacion = async (data) => {
    const req = await servicios.updateEquipo(equipo.id_equipo, data);
    setAction("C");
    loadData();
  };

  const onVolver = () => {
    setAction("C");
  };

  const onActualizar = (id_equipo) => {
    loadId(id_equipo);
    setAction("A");
  };

  const loadId = async (id_equipo) => {
    const equipo = await servicios.getEquiposbyId(id_equipo);
    setEquipo(equipo);
  };

  const tbody = data.map((equipo) => (
    <tr key={equipo.id_equipo}>
      <td>{equipo.nombre_equipo}</td>
      <td>{equipo.abreviatura}</td>
      <td className="">
        <button className="btn btn-primary" onClick={() => onActualizar(equipo.id_equipo)}>
          {" "}
          <i className="fa-solid fa-pen"></i>{" "}
        </button>
      </td>
      <td className="">
        <button
          className="btn btn-danger"
          onClick={() => onDelete(equipo.id_equipo)}
        >
          {" "}
          <i className="fa-solid fa-trash"></i>{" "}
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      {action === "A" && (
        <>
          <EquiposActualizar
            equipo={equipo}
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
                  onChange={(e) => setFiltroNombreEquipo(e.target.value)}
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
                    Agregar equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body p-2">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Nombre del Equipo</th>
                    <th scope="col">Abreviatura</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{tbody}</tbody>
              </table>
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}

export { EquiposListado };
