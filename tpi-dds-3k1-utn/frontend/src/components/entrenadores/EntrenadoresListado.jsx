import React, { useState } from "react";
import Actualizar from "./EntrenadoresActualizar";
import servicios from "../../services/entrenadores.services";
import "bootstrap/dist/css/bootstrap.css";

export default function EntrenadoresListado({
  data,
  equipos,
  onDelete,
  activarRegistro,
  handleSearch,
  nombre,
  setFiltroNombreEntrenador,
  loadData,
}) {
  const [action, setAction] = useState("C");
  const [entrenador, setEntrenador] = useState(null);

  const onGuardarActualizacion = async (data) => {
    if (entrenador) {
      await servicios.updateEntrenador(entrenador.id_entrenador, data);
      setAction("C");
      loadData();
    }
  };

  const onVolver = () => {
    setAction("C");
  };

  const onActualizar = async (id_entrenador) => {
    await loadId(id_entrenador);
    setAction("A");
  };

  const loadId = async (id_entrenador) => {
    const entrenadorData = await servicios.getEntrenadoresbyId(id_entrenador);
    setEntrenador(entrenadorData);
  };

  const tbody = data.map((entrenador) => {
    const equipo = equipos.find((equipo) => equipo.id_equipo === entrenador.id_equipo);
    return (
      <tr key={entrenador.id_entrenador}>
        <td>{entrenador.nombre_entrenador}</td>
        <td>{entrenador.fecha_nacimiento}</td>
        <td>{equipo ? equipo.nombre_equipo : "Equipo no encontrado"}</td>
        <td>
          <button className="btn btn-primary" onClick={() => onActualizar(entrenador.id_entrenador)}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(entrenador.id_entrenador)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {action === "A" && entrenador && (
        <Actualizar
          entrenador={entrenador}
          onGuardarActualizacion={onGuardarActualizacion}
          onVolver={onVolver}
          equipos={equipos}
        />
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
                  onChange={(e) => setFiltroNombreEntrenador(e.target.value)}
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
                    Agregar entrenador
                  </button>
                </div>
              </div>
            </div>
            <div className="card mt-4">
              <div className="card-body p-2">
                <table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Nombre del entrenador</th>
                      <th scope="col">Fecha Nacimiento</th>
                      <th scope="col">Equipo</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{tbody}</tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </div>
      )}
    </>
  );
}
