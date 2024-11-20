import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [userType, setUserType] = useState('startup');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    companyName: '',
    industry: '',
    website: '',
    contactInfo: '',
    area: '',
    fullName: '',
    qualifications: '',
    experience: '',
    contactDetails: '',
    assetTypes: '',
    classOfBusiness: '',
    reExams: '',
    cpdPoints: 0,
  });

  // Function to handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSignup(); // Call the handleSignup function to process the signup
  };

  // Function to handle the signup process
  const handleSignup = async () => {
    let url = userType === 'startup' 
    ? 'http://localhost:8080/register/startup' 
    : 'http://localhost:8080/register/keyindividual';

    console.log(`Submitting to URL: ${url}`); 

    // Prepare the Key Individual data
    if (userType === 'keyindividual') {
      formData.qualifications = formData.qualifications.split(',').map(item => item.trim());
      formData.experience = formData.experience.split(',').map(item => item.trim());
      formData.assetTypes = formData.assetTypes.split(',').map(item => item.trim());
      formData.classOfBusiness = formData.classOfBusiness.split(',').map(item => item.trim());
      formData.reExams = formData.reExams.split(',').map(item => item.trim());
    }

    try {
      await axios.post(url, formData); // Send the form data to the backend
      alert('Signup successful! Please check your email for the OTP.');
      window.location.href = '/verify-otp'; // Redirect to OTP verification page
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response) {
        // The request was made, and the server responded with a status code outside the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Signup failed: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('Request:', error.request);
        alert('Signup failed: No response from the server.');
      } else {
        // Something happened while setting up the request
        console.error('Error message:', error.message);
        alert(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setUserType(e.target.value)} className="form-select mb-3">
          <option value="startup">Startup</option>
          <option value="keyindividual">Key Individual</option>
        </select>

        {/* Common Fields */}
        <input className="form-control mb-3" name="username" onChange={handleChange} placeholder="Username" />
        <input className="form-control mb-3" name="email" onChange={handleChange} placeholder="Email" />
        <input className="form-control mb-3" type="password" name="password" onChange={handleChange} placeholder="Password" />

        {/* Fields for Startup Signup */}
        {userType === 'startup' && (
          <>
            <input className="form-control mb-3" name="companyName" onChange={handleChange} placeholder="Company Name" />
            <input className="form-control mb-3" name="industry" onChange={handleChange} placeholder="Industry" />
            <input className="form-control mb-3" name="website" onChange={handleChange} placeholder="Website" />
            <input className="form-control mb-3" name="contactInfo" onChange={handleChange} placeholder="Contact Information" />
            <input className="form-control mb-3" name="area" onChange={handleChange} placeholder="Area" />
          </>
        )}

        {/* Fields for Key Individual Signup */}
        {userType === 'keyindividual' && (
          <>
            <input className="form-control mb-3" name="fullName" onChange={handleChange} placeholder="Full Name" />
            <input className="form-control mb-3" name="qualifications" onChange={handleChange} placeholder="Qualifications (comma-separated)" />
            <input className="form-control mb-3" name="experience" onChange={handleChange} placeholder="Experience (comma-separated)" />
            <input className="form-control mb-3" name="contactDetails" onChange={handleChange} placeholder="Contact Details" />
            <input className="form-control mb-3" name="area" onChange={handleChange} placeholder="Area" />
            <input className="form-control mb-3" name="assetTypes" onChange={handleChange} placeholder="Asset Types (comma-separated)" />
            <input className="form-control mb-3" name="classOfBusiness" onChange={handleChange} placeholder="Class of Business (comma-separated)" />
            <input className="form-control mb-3" name="reExams" onChange={handleChange} placeholder="RE Exams (comma-separated)" />
            <input className="form-control mb-3" type="number" name="cpdPoints" onChange={handleChange} placeholder="CPD Points" />
          </>
        )}

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
