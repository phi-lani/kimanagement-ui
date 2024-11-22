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

  // Predefined document types
  const documentTypes = [
    'RE Exam Certificate',
    'CPD Points Certificate',
    'Work Experience Letter',
    'Identification Document',
    'Academic Qualification',
    'License Certificate',
  ];

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
      <h1 className="text-center mb-4">Key Individual Dashboard</h1>

      {/* Navigation Cards */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">View Profile</h5>
              <p className="card-text">Check and review your profile details.</p>
              <button className="btn btn-primary" onClick={handleViewProfile}>
                Go to Profile
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Update Profile</h5>
              <p className="card-text">Make changes to your profile information.</p>
              <button className="btn btn-secondary" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">View Messages</h5>
              <p className="card-text">Check messages sent by startups.</p>
              <button className="btn btn-info" onClick={handleViewMessages}>
                View Messages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="mt-5">
        <h2 className="text-center">Upload Documents</h2>
        <div className="card shadow-sm p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <div className="form-group">
            <label htmlFor="documentType">Document Type</label>
            <select
              className="form-control mb-3"
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select a document type</option>
              {documentTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label htmlFor="fileInput">Select File</label>
            <input
              type="file"
              className="form-control-file mb-3"
              id="fileInput"
              onChange={handleFileChange}
            />
            <button className="btn btn-primary btn-block" onClick={handleUpload}>
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyIndividualDashboard;
