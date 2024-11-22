import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP input for MFA
  const [step, setStep] = useState(1); // Step 1: Enter credentials, Step 2: Enter OTP
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (response.data.message === "OTP sent to your email for MFA verification") {
        setStep(2); // Move to OTP input step
      } else if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials or server error. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/verify-otp",
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError("Invalid OTP or server error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Login</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {step === 1 && (
        <div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              className="form-control mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP sent to your email"
            />
          </div>
          <button className="btn btn-primary" onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
