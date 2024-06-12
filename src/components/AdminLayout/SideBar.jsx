// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../assets/styles/AdminDashboardStyle.css'; // Import the CSS file for styles

const Sidebar = () => {
  return (
    <div className="kaiadmin__sidebar">
      <ul>
        <li className="active">
          <Link to="/">
            <i className="fas fa-home"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/brands"> {/* Use Link component with "to" prop */}
            <i className="fas fa-database"></i> Brands
          </Link>
        </li>
        <li>
          <Link to="/admin/vehicles"> {/* Use Link component with "to" prop */}
            <i className="fas fa-database"></i> Vehicles
          </Link>
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
    </div>
  );
};

export default Sidebar;
