import React, { useState, useRef, useEffect } from 'react';
import '../../assets/styles/AdminDashboardStyle.css'; // Assuming your CSS file is in the same directory

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleCloseSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleCloseSidebar);

    return () => {
      document.removeEventListener('mousedown', handleCloseSidebar);
    };
  }, []);

  return (
    <div className="kaiadmin">
      <img
        src="https://img.icons8.com/?size=100&id=dMz54mFbVirR&format=png&color=000000"
        alt="Drawer Icon"
        className={`drawer-toggle ${isOpen ? 'open' : ''}`}
        onClick={handleToggleSidebar}
      />
      <div ref={sidebarRef} className={`kaiadmin__sidebar ${isOpen ? 'open' : ''}`}>
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
                  <i className="fas fa-database"></i> Base
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-list-alt"></i> Sidebar Layouts
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
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> Maps
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chart-bar"></i> Charts
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-desktop"></i> Widgets
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-bars"></i> Menu Levels
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={`kaiadmin__content ${isOpen ? 'shifted' : ''}`}>
        <div className="kaiadmin__header">
          <div className="notification">
            <img
              src="https://img.icons8.com/cotton/2x/appointment-reminders.png"
              alt="Notification Icon"
              className="notification-icon"
            />
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="user">
            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="User Avatar" />
            <span>Hi, Hizrian</span>
          </div>
        </div>
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
