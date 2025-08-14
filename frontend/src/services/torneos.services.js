import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/torneos';

const getTorneos = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getTorneosById = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
   

const getTorneosByName = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreTorneo/${nombre}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postTorneo = async (torneo) => {
    try {
        const response = await axios.post(apiUrl, torneo);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const updateTorneo = async (id, torneo) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, torneo);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const deleteTorneo = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el torneo:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};
    

export default {getTorneos, getTorneosById, getTorneosByName, postTorneo, updateTorneo, deleteTorneo};
