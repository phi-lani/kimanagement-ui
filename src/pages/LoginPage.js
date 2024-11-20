import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import as a named import



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Make the login request to the backend with username
      const response = await axios.post('http://localhost:8080/login', { username, password });

      // Extract the token from the response
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in localStorage

      // Decode the token to extract the role
      const decodedToken = jwtDecode(token); // Use jwtDecode (corrected import)
      const role = decodedToken.role; // Extract the role from the decoded token

      // Check the role and redirect accordingly
      if (role === 'startup') {
        navigate('/startup/dashboard'); // Redirect to the startup dashboard
      } else if (role === 'key_individual') {
        navigate('/keyindividual/dashboard'); // Redirect to the Key Individual dashboard
      } else if (role === 'admin') {
        navigate('/admin/dashboard'); // Redirect to the admin dashboard
      } else {
        setError('Unknown role. Please contact support.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text" // Changed to text for username
          className="form-control mb-3"
          placeholder="Username" // Updated placeholder to Username
          value={username} // Updated to use username state
          onChange={(e) => setUsername(e.target.value)} // Updated to setUsername
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
