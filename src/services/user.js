import api from './api';

// Function to fetch the user profile
export const fetchUserProfile = async () => {
  const response = await api.get('/viewProfile');
  return response.data;
};

// Function to update the user profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put('/updateProfile', profileData);
  return response.data;
};

// Function to upload a document
export const uploadDocument = async (formData) => {
  const response = await api.post('/uploadDocument', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
