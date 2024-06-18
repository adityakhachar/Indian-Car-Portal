import React from 'react';
import '../../assets/styles/UserStyle.css';

const AdvInfo = () => {
  return (
    <div className="adv">
      <div className="adv-logo">
        <img src="https://raw.githubusercontent.com/nandpalmohit/carsline/5f3f222fefd289d46bfaf7cd3f86cb4b25536f65/assets/adv1.svg" alt="Advertisement Logo" />
      </div>
      <div className="adv-content">
        <h2>Sell your car at best Price</h2>
        <span>No Charges • Instant Payment • Covid Safety</span>
      </div>
      <div className="adv-info">
        <button type="submit" className="advBtn">Book your appointment</button>
        <h5 className="adv-terms"><i className="fa fa-check-square-o" aria-hidden="true"></i> Terms and Conditions apply</h5>
      </div>
    </div>
  );
};

export default AdvInfo;
