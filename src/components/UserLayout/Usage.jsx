import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UserPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <h1>User Page</h1>
      <div id="cars">
        <h2>Cars Section</h2>
        {/* Your content for the cars section */}
      </div>
    </div>
  );
};

export default UserPage;
