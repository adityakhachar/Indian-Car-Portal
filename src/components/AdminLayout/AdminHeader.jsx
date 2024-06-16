import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authToken found');
          navigate('/admin/login'); // Redirect to login if authToken is missing
        }
    
        const response = await fetch('http://localhost:5000/api/admin/auth/protected-route', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          setUsername(data.user.name); // Accessing directly from data.user.name
          console.log(data);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error condition, such as logging out the user or displaying an error message
      }
    };

    fetchUserName();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authToken from localStorage
    navigate('/admin/login'); // Navigate to the login page
  };

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
        {/* <span>Hi, {username}</span> */}
        <span>Hi, Aditya</span>
        <button
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;