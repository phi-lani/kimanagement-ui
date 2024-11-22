import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartupDashboard from './pages/StartupDashboard';

import UpdateStartupProfile from './pages/UpdateStartupProfile';
import UpdateKeyIndividualProfile from './pages/UpdateKeyIndividualProfile';
import ViewKeyIndividualProfile from './pages/ViewKeyIndividualProfile';
import SearchKeyIndividuals from './pages/SearchKeyIndividuals';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import KeyIndividualDashboard from './pages/KeyIndividualDashboard'; 
import ViewStartupProfile from './pages/ViewStartupProfile';
import NotFound from './pages/NotFound'
import OTPVerificationPage from './pages/OTPVerificationPage';
import ViewMessages from './pages/ViewMessages';
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminRegister from "./components/admin/AdminRegister";
import UnverifiedDocuments from "./components/admin/UnverifiedDocuments";


//import NotFoundPage from './pages/NotFoundPage';
import './styles.css'; // Import your CSS file for styling

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/startup/dashboard" element={<StartupDashboard />} />
          <Route path="/startup/update-profile" element={<UpdateStartupProfile />} />
          <Route path="/startup/search-key-individuals" element={<SearchKeyIndividuals />}/>
          <Route path="/keyindividual/dashboard" element={<KeyIndividualDashboard />} /> {/* New Route */}
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/view-profile" element={<ViewStartupProfile />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 page */}
          <Route path="/keyindividual/view-profile" element={<ViewKeyIndividualProfile />} />
          <Route path="/keyindividual/update-profile" element={<UpdateKeyIndividualProfile />} />
          <Route path="/keyindividual/messages" element={<ViewMessages />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/unverified-documents" element={<UnverifiedDocuments />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
