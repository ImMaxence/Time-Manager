import Axios from "./api.service";

const getWorkingTimes = async () => {
    try {
        const response = await Axios.get("/workingTimes");
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des données des workingTimes :",
            error
        );
        throw error;
    }
}

const getWorkingTimeById = async (id) => {
    try {
        const response = await Axios.get(`/workingTimes/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des données d'un workingTime :",
            error
        );
        throw error;
    }
}

const addWorkingTimeById = async (id) => {
    try {
        const response = await Axios.post(`/workingTimes/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de l'ajout d'un workingTime:",
            error
        );
        throw error;
    }
}

const updateWorkingTimeById = async (id) => {
    try {
        const response = await Axios.put(`/workingTimes/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour des données du workingTime :",
            error
        );
        throw error;
    }
}

const deleteWorkingTimeById = async (id) => {
    try {
        const response = await Axios.delete(`/workingTimes/${id}`);
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la suppression d'un workingTime :",
            error
        );
        throw error;
    }
}

export const workingTime_service = { getWorkingTimes, getWorkingTimeById, addWorkingTimeById, updateWorkingTimeById, deleteWorkingTimeById };