import React, { useState } from 'react';
import axios from 'axios';

const AdminSignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:8080/register/admin', formData);
      alert('Admin signup successful! Please check your email for the OTP.');
      window.location.href = '/verify-otp';
    } catch (error) {
      alert('Admin signup failed.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="card-title text-center mb-4">Admin Signup</h2>
        <input className="form-control mb-3" name="username" onChange={handleChange} placeholder="Username" />
        <input className="form-control mb-3" name="email" onChange={handleChange} placeholder="Email" />
        <input className="form-control mb-3" type="password" name="password" onChange={handleChange} placeholder="Password" />
        <button onClick={handleSignup} className="btn btn-primary w-100">Sign Up as Admin</button>
      </div>
    </div>
  );
};

export default AdminSignupPage;
