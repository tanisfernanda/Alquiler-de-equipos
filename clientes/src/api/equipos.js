import axios from "axios";

const URL = 'http://localhost:8000';
const endpoint = `${URL}/api/equipos`;

export const fetchEquipos = () => axios.get(endpoint);

export const fetchEquipo = (id) => axios.get(`${endpoint}/${id}`);

export const createEquipo = (newEquipo) => axios.post(endpoint, newEquipo);

export const updateEquipo = (id, equipo) => axios.put(`${endpoint}/${id}`, equipo);

export const deleteEquipo = (id) => axios.delete(`${endpoint}/${id}`);