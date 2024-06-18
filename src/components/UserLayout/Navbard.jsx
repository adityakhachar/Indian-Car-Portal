import React, { useState } from 'react';
import { MenuOutlined ,SearchOutlined} from '@ant-design/icons'; // Import MenuOutlined from Ant Design
import '../../assets/styles/UserStyle.css'; // Import the external CSS file

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <nav className="navbar-container">
        <h3 onClick={() => window.location.href = 'index.html'}>CarsLine</h3>
        <div className="search-container">
          <input
            type="search"
            name="searchCars"
            placeholder="Search Your Cars"
            className="searchInp"
          />
          <button type="button" className="searchBtn">
          <SearchOutlined/>
            {/* <i className="fa fa-search" aria-hidden="true"></i> */}
          </button>
        </div>
        <button type="button" className="menu-button" onClick={toggleMenu}>
          <MenuOutlined style={{ fontSize: '24px' }} /> {/* Increase size using inline style */}
        </button>
      </nav>
      <nav className={`menu-container ${menuActive ? 'active' : ''}`}>
        <a href="index.html" className="active">Home</a>
        <a href="#">Cars</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
      </nav>
    </div>
  );
};

export default Navbar;
