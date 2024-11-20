import React, { useState } from 'react';
import axios from 'axios';

const OTPVerificationPage = () => {
  const [otpData, setOtpData] = useState({ email: '', otp: '' });

  const handleChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/verify-otp', otpData);
      alert('OTP verified successfully!');
      window.location.href = '/login';
    } catch (error) {
      alert('Invalid OTP.');
    }
  };

  return (
    <div className="container mt-5">
      <form className="p-4 border rounded bg-light shadow" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-center">Verify OTP</h1>
        <input className="form-control mb-3" name="email" onChange={handleChange} placeholder="Email" />
        <input className="form-control mb-3" name="otp" onChange={handleChange} placeholder="OTP" />
        <button type="submit" className="btn btn-primary w-100">Verify</button>
      </form>
    </div>
  );
};

export default OTPVerificationPage;
