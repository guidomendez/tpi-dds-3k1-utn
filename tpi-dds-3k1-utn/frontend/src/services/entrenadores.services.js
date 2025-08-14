import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/entrenadores';

const getEntrenadores = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getEntrenadoresbyId = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
    

const getEntrenadorbyName = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreEntrenador/${nombre}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postEntrenador = async (entrenador) => {
    try { 
        const response = await axios.post(apiUrl, entrenador);
    return response.data;
    }  catch (error) {
        console.error(error);
    }
     
};

const updateEntrenador = async (id, entrenador) => { 
    try {const response = await axios.put(`${apiUrl}/${id}`, entrenador);
    return response.data;
}  catch (error) {
    console.error(error);
}
    
};

const deleteEntrenador = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el entrenador:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};

export default { getEntrenadores, getEntrenadoresbyId, getEntrenadorbyName, postEntrenador, updateEntrenador, deleteEntrenador};
