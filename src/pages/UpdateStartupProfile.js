import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateStartupProfile = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Industry: '',
    Website: '',
    ContactInformation: '',
    Area: '',
  });

  useEffect(() => {
    // Fetch existing profile data and populate the form
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ViewProfile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFormData(response.data);
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
    try {
      await axios.put('http://localhost:8080/startup/updateProfile', formData, {
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
      <h1 className="mb-4">Update Startup Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="form-control mb-3"
          name="Industry"
          value={formData.Industry}
          onChange={handleChange}
          placeholder="Industry"
        />
        <input
          className="form-control mb-3"
          name="Website"
          value={formData.Website}
          onChange={handleChange}
          placeholder="Website"
        />
        <input
          className="form-control mb-3"
          name="ContactInformation"
          value={formData.ContactInformation}
          onChange={handleChange}
          placeholder="Contact Information"
        />
        <input
          className="form-control mb-3"
          name="Area"
          value={formData.Area}
          onChange={handleChange}
          placeholder="Area"
        />
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateStartupProfile;
