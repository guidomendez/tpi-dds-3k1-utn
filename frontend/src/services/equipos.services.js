import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/equipos';

const getEquipos = async () => {
    try {
        const response = await axios.get(apiUrl);
        console.log('data recibida')
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getEquiposbyId = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
    

const getEquipoByName = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreEquipo/${nombre}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postEquipo = async (equipo) => { 
    try {const response = await axios.post(apiUrl, equipo);
    return response.data;
}  catch (error) {
    console.error(error);
}
    
};

const updateEquipo = async (id, equipo) => {
     try {
        const response = await axios.put(`${apiUrl}/${id}`, equipo);
    return response.data;
     } catch (error) {
        console.error(error);
    }
  
};

const deleteEquipo = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el equipo:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
   
};

export default { getEquipos, getEquiposbyId, getEquipoByName, postEquipo, updateEquipo, deleteEquipo};