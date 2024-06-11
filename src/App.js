import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/Admin/Register'; // Correct import path
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin/register" element={<RegistrationPage />} /> {/* Correct route path */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
