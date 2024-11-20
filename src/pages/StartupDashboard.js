import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartupDashboard.css'; // Import the CSS file for styling

const StartupDashboard = () => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/view-profile');
  };

  const handleUpdateProfile = () => {
    navigate('/startup/update-profile');
  };

  const handleSearchKeyIndividuals = () => {
    navigate('/startup/search-key-individuals');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Startup Dashboard</h1>
      <div className="button-group">
        <button className="dashboard-btn btn-view" onClick={handleViewProfile}>
          View Profile
        </button>
        <button className="dashboard-btn btn-update" onClick={handleUpdateProfile}>
          Update Profile
        </button>
        <button className="dashboard-btn btn-search" onClick={handleSearchKeyIndividuals}>
          Search Key Individuals
        </button>
      </div>
    </div>
  );
};

export default StartupDashboard;
