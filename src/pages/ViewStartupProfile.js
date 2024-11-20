import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStartupProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch the profile data
    const fetchProfile = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Authentication token is missing. Please log in again.');
          return;
        }

        // Make the API call to fetch the profile
        const response = await axios.get('http://localhost:8080/startup/viewProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Startup Profile</h1>
      <p><strong>Username:</strong> {profile.Username}</p>
      <p><strong>Email:</strong> {profile.Email}</p>
      <p><strong>Company Name:</strong> {profile.Name}</p>
      <p><strong>Industry:</strong> {profile.Industry}</p>
      <p><strong>Website:</strong> {profile.Website}</p>
      <p><strong>Contact Information:</strong> {profile.ContactInformation}</p>
      <p><strong>Area:</strong> {profile.Area}</p>
    </div>
  );
};

export default ViewStartupProfile;
