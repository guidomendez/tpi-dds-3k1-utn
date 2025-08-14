import { useEffect, useState } from 'react';
import EstadiosListado from './EstadiosListado.jsx';
import servicios from '../../services/estadios.services';
import serviciosCiudad from '../../services/ciudades.services';
import EstadiosRegistro from "./EstadiosRegistro";

export default function Estadio() {

  const [data, setData] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [nombre, setFiltroNombreEstadio] = useState('');
  const [action, setAction] = useState('L');

  const loadData = async () => {
    const data = await servicios.getEstadios()
    setData(data)
  }

  const loadCiudades = async () => {
    const ciudades = await serviciosCiudad.getCiudades()
    setCiudades(ciudades)
    console.log(ciudades)
  }

  useEffect(() => {
    loadData();
    loadCiudades();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminarlo?')) {
      try {
        await servicios.deleteEstadio(id);
        loadData();
      } catch (error) {
        alert('Hubo un error al intentar eliminar el Estadio. Por favor, intenta de nuevo.');
      }
    }
  }

  
  const handleSearch = async () => {
    if (nombre.trim() === "") {
      loadData(); // Si la caja de texto está vacía, recarga todos los árbitros
    } else {
      try {
        const data = await servicios.getEstadiobyName(nombre);
        // Verifica si data es un objeto y lo convierte en un arreglo
        setData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error(error);
        alert("Hubo un error al intentar buscar el árbitro. Por favor, intenta de nuevo.");
      }
    }
  };

  const activarRegistro = () => {
    setAction('R')
  }

  const activarListado = () => {
    setAction('L')
  }

  const registrarEstadios = async (data) => {
    await servicios.postEstadio(data)
    loadData()
    setAction('L')
  } 
  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center mt-4 mb-4">Estadio</h1>
        {action === "L" && (
          <EstadiosListado
            loadData={loadData}
            nombre={nombre}
            setFiltroNombreEstadio={setFiltroNombreEstadio}
            handleSearch={handleSearch}
            data={data}
            ciudades={ciudades}
            onDelete={onDelete}
            activarRegistro={activarRegistro}
          />
        )}
        {action === "R" && (
          <EstadiosRegistro
            ciudades={ciudades}
            registrarEstadios={registrarEstadios}
            activarListado={activarListado}
          />
        )}
      </div>
    </div>
  );
}
