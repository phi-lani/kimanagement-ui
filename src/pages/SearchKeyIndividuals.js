import React, { useState } from 'react';
import axios from 'axios';

const SearchKeyIndividuals = () => {
  const [qualifications, setQualifications] = useState('');
  const [experience, setExperience] = useState('');
  const [area, setArea] = useState('');
  const [classOfBusiness, setClassOfBusiness] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [showEmailFormForId, setShowEmailFormForId] = useState(null); // Track which email form to show
  const [emailDetails, setEmailDetails] = useState({
    subject: '',
    body: ''
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Check if the token exists
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        return;
      }

      // Make the API call to search for Key Individuals using GET
      const response = await axios.get('http://localhost:8080/startup/searchKeyIndividuals', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      setResults(response.data); // Set the results in the state
    } catch (err) {
      console.error('Error during search:', err);
      setError('Failed to fetch search results. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails({ ...emailDetails, [name]: value });
  };

  const handleSendEmail = async (recipientId) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // Check if the token exists
      if (!token) {
        setError('Authentication token is missing. Please log in again.');
        return;
      }

      // Make the API call to send the email
      await axios.post(
        'http://localhost:8080/sendMessage',
        {
          recipient_id: recipientId,
          subject: emailDetails.subject,
          body: emailDetails.body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      alert('Email sent successfully!');
      setShowEmailFormForId(null); // Hide the email form after sending
    } catch (err) {
      console.error('Error sending email:', err);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Key Individuals</h1>
      <form onSubmit={handleSearch}>
        <input
          className="form-control mb-3"
          placeholder="Qualifications (comma-separated)"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Experience (comma-separated)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Class of Business (comma-separated)"
          value={classOfBusiness}
          onChange={(e) => setClassOfBusiness(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="mt-4">
        <h2>Search Results:</h2>
        {results.length > 0 ? (
          <ul className="list-group">
            {results.map((individual, index) => (
              <li key={index} className="list-group-item">
                <p><strong>Full Name:</strong> {individual.FullName}</p>
                <p><strong>Qualifications:</strong> {individual.Qualifications.join(', ')}</p>
                <p><strong>Experience:</strong> {individual.Experience.join(', ')}</p>
                <p><strong>Area:</strong> {individual.Area}</p>
                <p><strong>Class of Business:</strong> {individual.ClassOfBusiness.join(', ')}</p>

                {/* Button to show email form */}
                <button
                  className="btn btn-success mt-2"
                  onClick={() => setShowEmailFormForId(individual.ID)}
                >
                  Send Email
                </button>

                {/* Show the email form only when the button is clicked for this specific Key Individual */}
                {showEmailFormForId === individual.ID && (
                  <div className="mt-3">
                    <input
                      className="form-control mb-2"
                      name="subject"
                      placeholder="Email Subject"
                      value={emailDetails.subject}
                      onChange={handleEmailChange}
                    />
                    <textarea
                      className="form-control mb-2"
                      name="body"
                      placeholder="Email Body"
                      value={emailDetails.body}
                      onChange={handleEmailChange}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSendEmail(individual.ID)}
                    >
                      Send
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchKeyIndividuals;
