import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/partidos';

const getPartidos = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getPartidobyId = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
    


const postPartido = async (partido) => {
    try {
        const response = await axios.post(apiUrl, partido);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const updatePartido = async (id, partido) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, partido);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const deletePartido = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el partido:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};

export default {getPartidos, getPartidobyId, postPartido, updatePartido, deletePartido};
