import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Welcome to KI Management System</h1>
      <p className="lead">Manage your Key Individuals with ease and security.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary btn-lg me-3">Log In</Link>
        <Link to="/signup" className="btn btn-secondary btn-lg">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
