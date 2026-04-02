import axios from 'axios';

const rawUrl =
  import.meta.env.VITE_SERVER_URL ??
  import.meta.env.VITE_BACKEND_URL ??
  'https://crudoperation-backend.vercel.app/api';

const API_BASE_URL = rawUrl.replace(/\/$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API response error', error);
    return Promise.reject(error);
  },
);

export default api;
export { API_BASE_URL };
