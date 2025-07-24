import axios from "axios";

const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
})
console.log(import.meta.env)

// Interceptors



export { backendAPI };
