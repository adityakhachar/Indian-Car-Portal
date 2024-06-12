// AdminDashboard.jsx
import React from 'react';
import '../../assets/styles/AdminDashboardStyle.css'; // Ensure the path is correct
import Sidebar from '../../components/AdminLayout/SideBar'; // Adjust the path based on your project structure
import AdminHeader from '../../components/AdminLayout/AdminHeader';

const AdminDashboard = () => {
  return (
    <div className="kaiadmin">
      <Sidebar />
      <div className="kaiadmin__content">
        <AdminHeader/>
        <div className="kaiadmin__main">
          <div className="kaiadmin__card">
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="title">Brands</div>
            <div className="value">23</div>
          </div>
          <div className="kaiadmin__card">
            <div className="icon">
              <i className="fas fa-user-check"></i>
            </div>
            <div className="title">Cars</div>
            <div className="value">204</div>
          </div>
          <div className="kaiadmin__card">
            <div className="icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="title">Users Registered</div>
            <div className="value">879</div>
          </div>
          <div className="kaiadmin__card">
            <div className="icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="title">Total visitors</div>
            <div className="value">1356</div>
          </div>
          <div className="kaiadmin__user-stats">
            <div className="title">User Statistics</div>
          </div>
          <div className="kaiadmin__daily-sales">
            <div className="title">Daily Sales</div>
            <div className="date">March 25-April 02</div>
            <div className="value">$4,578.58</div>
            <div className="kaiadmin__dropdown">
              <button className="kaiadmin__button secondary">Export</button>
              <div className="kaiadmin__dropdown-content">
                <a href="#">CSV</a>
                <a href="#">Excel</a>
                <a href="#">PDF</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
