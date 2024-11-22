import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AdminDashboard.css"; // Import custom CSS

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(response.data);
      } catch (err) {
        setError("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  const handleViewUnverifiedDocuments = () => {
    navigate("/admin/unverified-documents"); // Navigate to the unverified documents page
  };

  if (error)
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      {stats ? (
        <div className="stats-card">
          <ul className="stats-list">
            <li>
              <strong>Total Users:</strong> {stats.total_users}
            </li>
            <li>
              <strong>Total Key Individuals:</strong> {stats.total_key_individuals}
            </li>
            <li>
              <strong>Total Startups:</strong> {stats.total_startups}
            </li>
            <li>
              <strong>Pending Documents:</strong>{" "}
              <span
                className="link"
                onClick={handleViewUnverifiedDocuments}
              >
                {stats.pending_documents}
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
