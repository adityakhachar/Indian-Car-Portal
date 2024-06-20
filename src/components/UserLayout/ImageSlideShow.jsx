import React, { useState, useEffect } from 'react';
import '../../assets/styles/UserStyle.css'; // Import the external CSS file

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="adv-cars" style={{ marginTop: 30, padding: '0px 5%' }}>
      <img src={images[currentIndex]} alt="Slideshow" width="100%" />
    </div>
  );
};

export default ImageSlideshow;
