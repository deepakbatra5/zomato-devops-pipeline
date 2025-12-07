// frontend/src/api.js
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE ||
  `${window.location.protocol}//${window.location.hostname}:4000`;

const api = axios.create({
  baseURL, // e.g. http://3.230.142.197:4000
});

// 🔐 Attach JWT token (if present) to every request
api.interceptors.request.use((config) => {
  // IMPORTANT: use the same key you use in auth.js when storing the token
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

