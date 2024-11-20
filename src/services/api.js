import axios from 'axios';

// Set up the Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your backend URL
});

// Add a request interceptor to include the token in headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
