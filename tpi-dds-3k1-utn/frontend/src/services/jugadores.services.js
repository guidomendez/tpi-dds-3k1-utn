import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/jugadores';

const getJugadores = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getJugadorbyId = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
    

const getJugadoresByNombre = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreJugador/${nombre}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postJugador = async (jugador) => {
    try {
        const response = await axios.post(apiUrl, jugador);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const updateJugador = async (id, jugador) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, jugador);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const deleteJugador = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el jugador:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
    
};

export default {getJugadores, getJugadorbyId, getJugadoresByNombre, postJugador, updateJugador, deleteJugador};