import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewKeyIndividualProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.get("http://localhost:8080/keyindividual/viewProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Key Individual Profile</h1>
      <div className="card">
        <div className="card-body">
          <p><strong>Full Name:</strong> {profile.FullName}</p>
          <p><strong>Qualifications:</strong> {profile.Qualifications.join(", ")}</p>
          <p><strong>Experience:</strong> {profile.Experience.join(", ")}</p>
          <p><strong>Contact Details:</strong> {profile.ContactDetails}</p>
          <p><strong>Area:</strong> {profile.Area}</p>
          <p><strong>Asset Types:</strong> {profile.AssetTypes.join(", ")}</p>
          <p><strong>Class of Business:</strong> {profile.ClassOfBusiness.join(", ")}</p>
          <p><strong>RE Exams:</strong> {profile.REExams.join(", ")}</p>
          <p><strong>CPD Points:</strong> {profile.CPDPoints}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewKeyIndividualProfile;
