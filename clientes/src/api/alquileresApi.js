import axios from "axios";

const URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const endpoint = `${URL}/api/alquileres`;

export const fetchAlquileres = () => axios.get(endpoint);

export const fetchAlquiler = (id) => axios.get(`${endpoint}/${id}`);

export const createAlquiler = (alquiler) => axios.post(endpoint, alquiler);

export const updateAlquiler = (id, alquiler) =>
  axios.put(`${endpoint}/${id}`, alquiler);

export const deleteAlquiler = (id) => axios.delete(`${endpoint}/${id}`);
