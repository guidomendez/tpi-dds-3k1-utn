import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/arbitros';

const getArbitros = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getArbitrosByID = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
    

const getArbitroByName = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreArbitro/${nombre}`);
        console.log("Arbitro encontrado: ", response.data)
    return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postArbitro = async (arbitro) => {
    try {
        const response = await axios.post(apiUrl, arbitro);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const updateArbitro = async (id, arbitro) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, arbitro);
    return response.data;
    }  catch (error) {
        console.error(error);
    }
    
};

const deleteArbitro = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el árbitro:', error);  // Lanza el error para que pueda ser manejado por el componente que llama
        throw error;
    }
};

export default { getArbitros, getArbitrosByID, getArbitroByName, postArbitro, updateArbitro, deleteArbitro };
