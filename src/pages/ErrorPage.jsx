// NotFoundPage.js

import React from 'react';
import '../assets/styles/ErrorPage.css'; // Import your CSS file
// import { Link } from 'react-router-dom';
const ErrorPage = () => {
  const handleHomePageClick = () => {
    // Check current path and redirect accordingly
    if (window.location.pathname.startsWith('/admin')) {
      window.location.href = '/admin/login';
    } else {
      window.location.href = '/user';
    }
  };

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>4<span>0</span>4</h1>
        </div>
        <br/>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <button onClick={handleHomePageClick} className="btn-home">Home Page</button>
      </div>
    </div>
  );
};

export default ErrorPage;
