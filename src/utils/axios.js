// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.111:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Si hay token, lo añade a cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
