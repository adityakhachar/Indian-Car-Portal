// Footer.js

import React from 'react';
import '../../assets/styles/UserStyle.css'; // Import your external CSS file for styling

const Footer = () => {
  return (
    <footer className="content">
      <div className="data">
        <h3>AutoGuide</h3>
        <p>India's #1 and largest portal of auto car vehicle. We give you the <br /> best reviews and rates for your cars.We believe brand interaction <br /> is key in communication. Real innovations and a positive <br /> customer experience are the heart of successful communication.</p>
      </div>
      <div className="link">
        <h3>Links</h3>
        <a href="#" title="">Home</a>
        <a href="#" title="">About Us</a>
        <a href="#" title="">Cars</a>
        <a href="#" title="">Contact Us</a>
        <a href="#" title="">News</a>
      </div>
      <div className="service">
        <h3>Services</h3>
        <a href="#" title="">Brands</a>
        <a href="#" title="">Compare Cars</a>
        <a href="#" title="">Top Selling Cars</a>
        <a href="#" title="">Top Luxury Cars</a>
      </div>
      <div className="detail">
        <h3>Contact Us</h3>
        <a href="mailto:adityakhachar15@gmail.com" title="">adityakhachar15@gmail.com</a>
        <a href="tel:+917485928893" title="">+91 7485928893</a>
        <a href="https://carwale.com" title="">AutoGuide.com</a>
      </div>
      <a href="https://github.com/adityakhachar" className="copyright">&copy; AutoGuide 2024 All rights reserved. Powered <span><i className="fa fa-heart" aria-hidden="true"></i></span> by Aditya Khachar.</a>
    </footer>
  );
};

export default Footer;
