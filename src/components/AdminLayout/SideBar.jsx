// Sidebar.jsx
import React from 'react';
import '../../assets/styles/AdminDashboardStyle.css'; // Import the CSS file for styles

const Sidebar = () => {
  return (
    <div className="kaiadmin__sidebar">
      <ul>
        <li className="active">
          <a href="#">
            <i className="fas fa-home"></i> Dashboard
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fas fa-list-ul"></i> Components
            <i className="fas fa-angle-down"></i>
          </a>
          <ul>
            <li>
              <a href="#">
                <i className="fas fa-database"></i> Brands
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-list-alt"></i> Users
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-file-alt"></i> Forms
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-table"></i> Tables
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
