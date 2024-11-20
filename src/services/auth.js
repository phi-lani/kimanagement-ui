import api from './api';

// Function to handle user login
export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Save the token
  }
  return response.data;
};

// Function to handle user logout
export const logout = () => {
  localStorage.removeItem('token');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
