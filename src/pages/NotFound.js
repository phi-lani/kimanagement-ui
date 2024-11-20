import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // Import the custom CSS file for styling

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you're looking for can't be found.</p>
      <p className="not-found-description">
        It looks like you may have taken a wrong turn. Don't worry, it happens to the best of us!
      </p>
      <button className="go-home-button" onClick={handleGoHome}>
        Take Me Home
      </button>
    </div>
  );
};

export default NotFound;
