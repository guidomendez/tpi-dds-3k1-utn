import Actualizar from "./PartidosActualizar";
import servicios from "../../services/partidos.services";
import React, { useState } from "react";

export default function PartidosListado({
  data,
  estadio,
  torneo,
  equipoLocal,
  equipoVisitante,
  arbitro,
  onDelete,
  activarRegistro,
  loadData
}) {
  const [action, setAction] = useState("C");
  const [partido, setPartido] = useState(null);

  const onGuardarActualizacion = async (data) => {
    if (data.id_equipo_local === data.id_equipo_visitante) {
      alert("El equipo local y el equipo visitante no pueden ser el mismo.");
      return; // Retorna para evitar continuar con la actualización
    }

    try {
      if (partido) {
        await servicios.updatePartido(partido.id_partido, data);
        setAction("C");
        loadData();
      } else {
        console.error("No se ha proporcionado un partido válido para actualizar.");
      }
    } catch (error) {
      console.error("Error al actualizar el partido:", error);
      // Maneja el error de actualización aquí, según sea necesario
    }
  };

  const onVolver = () => {
    setAction("C");
  };

  const onActualizar = async (id_partido) => {
    await loadId(id_partido);
    setAction("A");
  };

  const loadId = async (id_partido) => {
    const partidoData = await servicios.getPartidobyId(id_partido);
    setPartido(partidoData);
  };

  const tbody = data.map((partido) => {
    const torneos = torneo.find((t) => t.id_torneo === partido.id_torneo);
    const estadios = estadio.find((e) => e.id_estadio === partido.id_estadio);
    const equipoLocales = equipoLocal.find((el) => el.id_equipo === partido.id_equipo_local);
    const equipoVisitantes = equipoVisitante.find((ev) => ev.id_equipo === partido.id_equipo_visitante);
    const arbitros = arbitro.find((a) => a.id_arbitro === partido.id_arbitro);

    return (
      <tr key={partido.id_partido}>
        <td>{partido.fecha}</td>
        <td>{estadios ? estadios.nombre_estadio : '-'}</td>
        <td>{torneos ? torneos.nombre_torneo : '-'}</td>
        <td>{equipoLocales ? equipoLocales.nombre_equipo : '-'}</td>
        <td>{equipoVisitantes ? equipoVisitantes.nombre_equipo : '-'}</td>
        <td>{arbitros ? arbitros.nombre_arbitro : '-'}</td>
        <td>{partido.resultado}</td>
        <td>
          <button className="btn btn-primary" onClick={() => onActualizar(partido.id_partido)}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(partido.id_partido)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {action === "A" && partido && (
        <Actualizar
          partido={partido}
          estadios={estadio}
          torneos={torneo}
          equipoLocal={equipoLocal}
          equipoVisitante={equipoVisitante}
          arbitros={arbitro}
          onGuardarActualizacion={onGuardarActualizacion}
          onVolver={onVolver}
        />
      )}
      {action === "C" && (
        <div>
          <div className="mt-4">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <button className="btn btn-success ms-4" onClick={activarRegistro}>
                  Agregar partido
                </button>
              </div>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body p-2">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Fecha del Partido</th>
                    <th scope="col">Estadio</th>
                    <th scope="col">Torneo</th>
                    <th scope="col">Equipo Local</th>
                    <th scope="col">Equipo Visitante</th>
                    <th scope="col">Árbitro</th>
                    <th scope="col">Resultado</th>
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
