import React from "react";
import { useState } from "react";
import JugadoresActualizar from "./JugadoresActualizar";
import servicios from "../../services/jugadores.services";

export default function JugadoresListado({ loadData, data, equipos, onDelete, setFiltroNombreJugador, handleSearch, nombre, activarRegistro }) {
  const [action, setAction] = useState("Listado");
  const [jugador, setJugador] = useState([]);

  const onGuardarActualizacion = async (data) => {
    await servicios.updateJugador(jugador.id_jugador, data);
    setAction("Listado");
    loadData();
  };

  const onVolver = () => {
    setAction("Listado");
  };

  const onActualizar = (id_jugador) => {
    loadId(id_jugador);
    setAction("Actualizar");
  };

  const loadId = async (id_jugador) => {
    const jugador = await servicios.getJugadorbyId(id_jugador);
    setJugador(jugador);
  };

  const tbody = data.map((jugador) => {
    const equipo = equipos.find(
      (equipo) => equipo.id_equipo === jugador.id_equipo
    );
    return (
      <tr key={jugador.id_jugador}>
        <td>{jugador.nombre_jugador}</td>
        <td>{jugador.fecha_nacimiento}</td>
        <td>{jugador.posicion}</td>
        <td>{equipo ? equipo.nombre_equipo : "Equipo no encontrado"}</td>
        <td>
          <button className="btn btn-primary" onClick={() => onActualizar(jugador.id_jugador)}> <i className="fa-solid fa-pen"></i> </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(jugador.id_jugador)}> <i className="fa-solid fa-trash"></i> </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {action === "Actualizar" && (
        <JugadoresActualizar
          equipos={equipos}
          jugador={jugador}
          onGuardarActualizacion={onGuardarActualizacion}
          onVolver={onVolver}
        />
      )}
      {action === "Listado" && (
        <div>
          <div className="mt-4">
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control rounded-start"
                  value={nombre}
                  onChange={(e) => setFiltroNombreJugador(e.target.value)}
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
                    Agregar jugador
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
                    <th scope="col">Nombre del jugador</th>
                    <th scope="col">Fecha de Nacimiento</th>
                    <th scope="col">Posición</th>
                    <th scope="col">Equipo</th>
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
