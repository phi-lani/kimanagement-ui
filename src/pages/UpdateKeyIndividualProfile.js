import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateKeyIndividualProfile = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Qualifications: '',
    Experience: '',
    ContactDetails: '',
    Area: '',
    AssetTypes: '',
    ClassOfBusiness: '',
    REExams: '',
    CPDPoints: 0,
  });

  useEffect(() => {
    // Fetch existing profile data and populate the form
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/keyindividual/viewProfile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const profileData = response.data;
        // Convert array fields to comma-separated strings for form inputs
        setFormData({
          FullName: profileData.FullName,
          Qualifications: profileData.Qualifications.join(', '),
          Experience: profileData.Experience.join(', '),
          ContactDetails: profileData.ContactDetails,
          Area: profileData.Area,
          AssetTypes: profileData.AssetTypes.join(', '),
          ClassOfBusiness: profileData.ClassOfBusiness.join(', '),
          REExams: profileData.REExams.join(', '),
          CPDPoints: profileData.CPDPoints,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert comma-separated strings back to arrays for the backend
    const updatedData = {
      ...formData,
      Qualifications: formData.Qualifications.split(',').map(item => item.trim()),
      Experience: formData.Experience.split(',').map(item => item.trim()),
      AssetTypes: formData.AssetTypes.split(',').map(item => item.trim()),
      ClassOfBusiness: formData.ClassOfBusiness.split(',').map(item => item.trim()),
      REExams: formData.REExams.split(',').map(item => item.trim()),
    };

    try {
      await axios.put('http://localhost:8080/keyindividual/updateProfile', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Key Individual Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="FullName"
          value={formData.FullName}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          className="form-control mb-3"
          name="Qualifications"
          value={formData.Qualifications}
          onChange={handleChange}
          placeholder="Qualifications (comma-separated)"
        />
        <input
          className="form-control mb-3"
          name="Experience"
          value={formData.Experience}
          onChange={handleChange}
          placeholder="Experience (comma-separated)"
        />
        <input
          className="form-control mb-3"
          name="ContactDetails"
          value={formData.ContactDetails}
          onChange={handleChange}
          placeholder="Contact Details"
        />
        <input
          className="form-control mb-3"
          name="Area"
          value={formData.Area}
          onChange={handleChange}
          placeholder="Area"
        />
        <input
          className="form-control mb-3"
          name="AssetTypes"
          value={formData.AssetTypes}
          onChange={handleChange}
          placeholder="Asset Types (comma-separated)"
        />
        <input
          className="form-control mb-3"
          name="ClassOfBusiness"
          value={formData.ClassOfBusiness}
          onChange={handleChange}
          placeholder="Class of Business (comma-separated)"
        />
        <input
          className="form-control mb-3"
          name="REExams"
          value={formData.REExams}
          onChange={handleChange}
          placeholder="RE Exams (comma-separated)"
        />
        <input
          className="form-control mb-3"
          type="number"
          name="CPDPoints"
          value={formData.CPDPoints}
          onChange={handleChange}
          placeholder="CPD Points"
        />
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateKeyIndividualProfile;
