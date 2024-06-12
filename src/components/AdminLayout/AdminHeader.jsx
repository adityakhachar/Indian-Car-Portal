import React from 'react';

const AdminHeader = ({ username }) => {
  return (
    <div className="kaiadmin__header" style={{ position: 'sticky', top: 0, zIndex: 999 }}>
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
        <span>Hi, {username}</span>
      </div>
    </div>
  );
};

export default AdminHeader;
