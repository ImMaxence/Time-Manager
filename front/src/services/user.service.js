import Axios from "./api.service";

const getUser = async () => {
  try {
    const response = await Axios.get("/users");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données des utilisateurs :",
      error
    );
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await Axios.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données d'un utilisateur :",
      error
    );
    throw error;
  }
};

const addUser = async (userData) => {
  try {
    const response = await Axios.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un utilisateur:", error);
    throw error;
  }
};

const updateUserById = async (id, userData) => {
  try {
    const response = await Axios.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des données de l'utilisateur :",
      error
    );
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const response = await Axios.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression d'un utilisateur :", error);
    throw error;
  }
};

export const user_service = {
  getUser,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
};
