import { useEffect, useState } from 'react';
import JugadoresListado from './JugadoresListado';
import servicios from '../../services/jugadores.services';
import serviciosEquipo from '../../services/equipos.services';
import JugadoresRegistro from './JugadoresRegistro';

export default function Jugadores() {
  const [data, setData] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [nombre, setFiltroNombreJugador] = useState('');
  const [action, setAction] = useState('L');

  const loadData = async () => {
    const jugadores = await servicios.getJugadores();
    setData(jugadores);
  };

  const loadEquipos = async () => {
    const data = await serviciosEquipo.getEquipos();
    setEquipos(data);
  };

  useEffect(() => {
    loadData();
    loadEquipos();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminarlo?')) {
      try {
        await servicios.deleteJugador(id);
        loadData();
        loadEquipos();
      } catch (error) {
        alert('Hubo un error al intentar eliminar el Jugador. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleSearch = async () => {
    if (nombre.trim() === '') {
      loadData(); // Si la caja de texto está vacía, recarga todos los jugadores
    } else {
      try {
        const data = await servicios.getJugadoresByNombre(nombre);
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert('Hubo un error al intentar buscar el jugador. Por favor, intenta de nuevo.');
      }
    }
  };

  const activarRegistro = () => {
    setAction('R');
  };

  const activarListado = () => {
    setAction('L');
  };

  const registrarJugadores = async (data) => {
    await servicios.postJugador(data);
    loadData();
    setAction('L');
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center mt-4 mb-4">Jugadores</h1>
        {action === 'L' && (
          <JugadoresListado
            loadData={loadData}
            nombre={nombre}
            setFiltroNombreJugador={setFiltroNombreJugador}
            handleSearch={handleSearch}
            data={data}
            equipos={equipos}
            onDelete={onDelete}
            activarRegistro={activarRegistro}
          />
        )}
        {action === 'R' && (
          <JugadoresRegistro
            equipos={equipos}
            registrarJugadores={registrarJugadores}
            activarListado={activarListado}
          />
        )}
      </div>
    </div>
  );
}
