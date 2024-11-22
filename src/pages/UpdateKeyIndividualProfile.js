import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateKeyIndividualProfile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    qualifications: "",
    experience: "",
    contact_details: "",
    area: "",
    asset_types: "",
    class_of_business: "",
    re_exams: "",
    cpd_points: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/keyindividual/viewProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      setProfile({
        full_name: data.FullName,
        qualifications: data.Qualifications.join(", "),
        experience: data.Experience.join(", "),
        contact_details: data.ContactDetails,
        area: data.Area,
        asset_types: data.AssetTypes.join(", "),
        class_of_business: data.ClassOfBusiness.join(", "),
        re_exams: data.REExams.join(", "),
        cpd_points: data.CPDPoints,
      });
    } catch (err) {
      setError("Failed to fetch profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      const payload = {
        full_name: profile.full_name,
        qualifications: profile.qualifications.split(",").map((q) => q.trim()),
        experience: profile.experience.split(",").map((e) => e.trim()),
        contact_details: profile.contact_details,
        area: profile.area,
        asset_types: profile.asset_types.split(",").map((at) => at.trim()),
        class_of_business: profile.class_of_business.split(",").map((cb) => cb.trim()),
        re_exams: profile.re_exams.split(",").map((re) => re.trim()),
        cpd_points: parseInt(profile.cpd_points, 10),
      };

      await axios.put("http://localhost:8080/keyindividual/updateProfile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Key Individual Profile</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            className="form-control"
            value={profile.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Qualifications (comma-separated)</label>
          <input
            type="text"
            name="qualifications"
            className="form-control"
            value={profile.qualifications}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Experience (comma-separated)</label>
          <input
            type="text"
            name="experience"
            className="form-control"
            value={profile.experience}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contact Details</label>
          <input
            type="text"
            name="contact_details"
            className="form-control"
            value={profile.contact_details}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Area</label>
          <input
            type="text"
            name="area"
            className="form-control"
            value={profile.area}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Asset Types (comma-separated)</label>
          <input
            type="text"
            name="asset_types"
            className="form-control"
            value={profile.asset_types}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Class of Business (comma-separated)</label>
          <input
            type="text"
            name="class_of_business"
            className="form-control"
            value={profile.class_of_business}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>RE Exams (comma-separated)</label>
          <input
            type="text"
            name="re_exams"
            className="form-control"
            value={profile.re_exams}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>CPD Points</label>
          <input
            type="number"
            name="cpd_points"
            className="form-control"
            value={profile.cpd_points}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateKeyIndividualProfile;
