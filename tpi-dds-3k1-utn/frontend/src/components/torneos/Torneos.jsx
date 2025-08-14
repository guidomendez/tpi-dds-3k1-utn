import { useEffect, useState } from 'react';
import TorneosListado from './TorneosListado.jsx';
import servicios from '../../services/torneos.services';
import TorneosRegistro from './TorneosRegistro.jsx';

export default function Torneos() {
  const [data, setData] = useState([]);
  const [nombre, setFiltroNombreTorneo] = useState('');
  const [action, setAction] = useState('C');

  const loadData = async () => {
    const data = await servicios.getTorneos();
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminarlo?')) {
      try {
        await servicios.deleteTorneo(id);
        loadData();
      } catch (error) {
        alert(
          'Hubo un error al intentar eliminar el torneo. Por favor, intenta de nuevo.'
        );
      }
    }
  };

  const handleSearch = async () => {
    if (nombre.trim() === '') {
      loadData(); // Si la caja de texto está vacía, recarga todos los árbitros
    } else {
      try {
        const data = await servicios.getTorneosByName(nombre);
        // Verifica si data es un objeto y lo convierte en un arreglo
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert(
          'Hubo un error al intentar buscar el torneo. Por favor, intenta de nuevo.'
        );
      }
    }
  };

  async function onSubmit(data) {
    await servicios.postTorneo(data);
    loadData();
    setAction('C');
  }

  function activarConsulta() {
    setAction('C'); // Establece la acción actual como Consulta
  }

  function activarRegistro() {
    setAction('R'); // Establece la acción actual como Registro
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-4 mb-4">Torneos</h1>
      {action === 'C' && (
        <div className="card-body">
          <TorneosListado
            data={data}
            onDelete={onDelete}
            activarRegistro={activarRegistro}
            handleSearch={handleSearch}
            loadData={loadData}
            nombre={nombre}
            setFiltroNombreTorneo={setFiltroNombreTorneo}
          />
        </div>
      )}
      {action === 'R' && (
        <TorneosRegistro onSubmit={onSubmit} activarConsulta={activarConsulta} />
      )}
    </div>
  );
}
