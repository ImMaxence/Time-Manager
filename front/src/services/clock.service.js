import Axios from "./api.service";

const getClocks = async () => {
    try {
        const response = await Axios.get("/clocks");
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des données des clocks :",
            error
        );
        throw error;
    }
}

const getClockById = async (id) => {
    try {
        const response = await Axios.get(`/clocks/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des données d'un clock :",
            error
        );
        throw error;
    }
}

const addClockById = async (id) => {
    try {
        const response = await Axios.post(`/clocks/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de l'ajout d'un clock:",
            error
        );
        throw error;
    }
}

const updateClockById = async (id) => {
    try {
        const response = await Axios.put(`/clocks/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour des données du clock :",
            error
        );
        throw error;
    }
}

const deleteClockById = async (id) => {
    try {
        const response = await Axios.delete(`/clocks/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la suppression d'un clock :",
            error
        );
        throw error;
    }
}

export const clock_service = { getClocks, getClockById, addClockById, updateClockById, deleteClockById };