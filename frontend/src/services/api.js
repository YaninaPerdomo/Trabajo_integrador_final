import axios from 'axios';

const api = axios.create({
    // Si hay una variable de entorno la usa, si no, usa /api (ruta relativa para Vercel)
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Interceptor para agregar el token JWT a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
