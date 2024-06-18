import React from 'react';
import Navbar from '../../components/UserLayout/Navbar';
import Footer from '../../components/UserLayout/Footer';
import '../../assets/styles/UserStyle.css'; // Import the external CSS file
import AdvInfo from '../../components/UserLayout/AdvInfo';

const UserDashboard = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <header className="banner">
          <div className="title">
            <p>We are India's #1 Auto Portal Website for Cars.</p>
            <h3>Thank You For Visit.</h3>
          </div>
        </header>
      </div>
      <AdvInfo />
      <div>
        {/* Other content of your application */}
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
