import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8002/api",
});

// Interceptor: Antes de que salga cualquier petición, le pega el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
