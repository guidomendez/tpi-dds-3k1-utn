import { useEffect, useState } from 'react';
import PartidosListado from './PartidosListado';
import servicios from '../../services/partidos.services';
import serviciosEquipo from '../../services/equipos.services';
import serviciosEstadio from '../../services/estadios.services';
import serviciosTorneos from '../../services/torneos.services';
import serviciosArbitro from '../../services/arbitros.services';
import PartidosRegistro from './PartidosRegistro';

export default function Partidos() {
  const [data, setData] = useState([]);
  const [estadio, setEstadio] = useState([]);
  const [torneo, setTorneo] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [arbitro, setArbitro] = useState([]);
  const [action, setAction] = useState('C');

  const loadEquipos = async () => {
    const data = await serviciosEquipo.getEquipos();
    setEquipos(data);
  };

  const loadEstadio = async () => {
    const estadios = await serviciosEstadio.getEstadios();
    setEstadio(estadios);
  };

  const loadTorneo = async () => {
    const torneos = await serviciosTorneos.getTorneos();
    setTorneo(torneos);
  };

  const loadData = async () => {
    const data = await servicios.getPartidos();
    setData(data);
  };

  const loadArbitros = async () => {
    const arbitros = await serviciosArbitro.getArbitros();
    setArbitro(arbitros);
  };

  useEffect(() => {
    loadData();
    loadEquipos();
    loadEstadio();
    loadTorneo();
    loadArbitros();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminarlo?")) {
      try {
        await servicios.deletePartido(id);
        loadData();
      } catch (error) {
        alert("Hubo un error al intentar eliminar el partido. Por favor, intenta de nuevo.");
      }
    }
  };

  const onSubmit = async (data) => {
    if (data.id_equipo_local === data.id_equipo_visitante) {
      alert("El equipo local y el equipo visitante no pueden ser el mismo.");
      return;
    }

    await servicios.postPartido(data);
    loadData();
    setAction("C");
  };

  const activarConsulta = () => {
    setAction("C");
  };

  const activarRegistro = () => {
    setAction("R");
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center mt-4 mb-4">Partidos</h1>
        {action === 'C' && (
          <PartidosListado
            data={data}
            estadio={estadio}
            torneo={torneo}
            equipoLocal={equipos}
            equipoVisitante={equipos}
            arbitro={arbitro}
            onDelete={onDelete}
            activarRegistro={activarRegistro}
            loadData={loadData}
          />
        )}
        {action === "R" && (
          <PartidosRegistro
            onSubmit={onSubmit}
            activarConsulta={activarConsulta}
            estadios={estadio}
            torneo={torneo}
            equipoLocal={equipos}
            equipoVisitante={equipos}
            arbitros={arbitro}
          />
        )}
      </div>
    </div>
  );
}
