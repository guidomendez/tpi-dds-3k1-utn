import axios from 'axios';
const apiUrl = 'http://localhost:4000/api/ciudades';

const getCiudades = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getCiudadesByID = async (id) => {
    try {const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
}
    

const getCiudadByName = async (nombre) => {
    try {
        const response = await axios.get(`${apiUrl}/nombreCiudad/${nombre}`);
    return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postCiudad = async (ciudad) => {
    try {
        const response = await axios.post(apiUrl, ciudad);
    return response.data;
    } catch (error) {
        console.error(error);
    }
    
};

const updateCiudad = async (id, ciudad) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, ciudad);
    return response.data;
    }  catch (error) {
        console.error(error);
    }
    
};

const deleteCiudad = async (id) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la ciudad:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};
    

export default { getCiudades, getCiudadesByID, getCiudadByName, postCiudad, updateCiudad, deleteCiudad};
