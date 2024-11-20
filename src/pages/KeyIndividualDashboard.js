import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KeyIndividualDashboard = () => {
  const navigate = useNavigate();

  // State for document upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Functions for navigation
  const handleViewProfile = () => {
    navigate('/keyindividual/view-profile'); // Route to the view profile page
  };

  const handleUpdateProfile = () => {
    navigate('/keyindividual/update-profile'); // Route to the update profile page
  };

  const handleViewMessages = () => {
    navigate('/keyindividual/messages'); // Route to view messages (if you have this functionality)
  };

  // Functions for document upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !documentType) {
      setError('Please select a file and specify the document type.');
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('documentType', documentType);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        return;
      }

      // Make the API call to upload the document
      const response = await axios.post('http://localhost:8080/uploadDocument', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Document uploaded successfully!');
      setError(null);
    } catch (err) {
      console.error('Error uploading document:', err);
      setError('Failed to upload document. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Key Individual Dashboard</h1>
      <div className="button-group">
        <button className="btn btn-primary mb-3" onClick={handleViewProfile}>
          View Profile
        </button>
        <button className="btn btn-secondary mb-3" onClick={handleUpdateProfile}>
          Update Profile
        </button>
        <button className="btn btn-info mb-3" onClick={handleViewMessages}>
          View Messages
        </button>
      </div>

      <div className="mt-5">
        <h2>Upload Documents</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div className="form-group">
          <label htmlFor="documentType">Document Type</label>
          <input
            type="text"
            className="form-control mb-3"
            id="documentType"
            value={documentType}
            onChange={handleDocumentTypeChange}
            placeholder="Enter document type (e.g., RE Exam Certificate)"
          />
          <label htmlFor="fileInput">Select File</label>
          <input
            type="file"
            className="form-control-file mb-3"
            id="fileInput"
            onChange={handleFileChange}
          />
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyIndividualDashboard;
