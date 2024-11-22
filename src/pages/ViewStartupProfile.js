import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewStartupProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setError(null); // Reset any previous errors
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.get("http://localhost:8080/viewProfile", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      console.log("Profile data:", response.data);
      setProfile(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Startup Profile</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Name:</strong> {profile.Name}
        </li>
        <li className="list-group-item">
          <strong>Industry:</strong> {profile.Industry}
        </li>
        <li className="list-group-item">
          <strong>Website:</strong> {profile.Website}
        </li>
        <li className="list-group-item">
          <strong>Contact Information:</strong> {profile.ContactInformation}
        </li>
        <li className="list-group-item">
          <strong>Area:</strong> {profile.Area}
        </li>
      </ul>
    </div>
  );
};

export default ViewStartupProfile;
