import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    const payload = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/register/admin", payload, {
        headers: {
          "X-API-Key": apiKey, // Include the API key in the request headers
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Admin registered successfully.");
      setError(null);

      // Redirect to Verify OTP page after successful registration
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } }); // Pass email as state for OTP verification
      }, 1500); // Add a slight delay for user feedback
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register admin. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Registration</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>API Key</label>
          <input
            type="text"
            className="form-control"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
