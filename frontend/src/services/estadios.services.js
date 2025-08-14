
import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/estadios';

const getEstadios = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getEstadiosbyId = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


const getEstadiobyName = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreEstadio/${nombre}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postEstadio = async (estadio) => {
    try {
        const response = await axios.post(apiUrl, estadio);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateEstadio = async (id, estadio) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, estadio);
        return response.data;
    } catch (error) {
        console.error(error);
    }

};

const deleteEstadio = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el estadio:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }

};

export default { getEstadios, getEstadiosbyId, getEstadiobyName, postEstadio, updateEstadio, deleteEstadio };