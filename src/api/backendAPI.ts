import axios from 'axios';

const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});
console.log(import.meta.env);

// Interceptors
backendAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { backendAPI };
