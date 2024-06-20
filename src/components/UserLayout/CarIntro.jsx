import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import '../../assets/styles/UserStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate, Typography } from 'antd';

const CarIntro = () => {
  const [vehicle, setVehicle] = useState(null);
  const [brandName, setBrandName] = useState(""); // State to store brand name
  const { id } = useParams(); // Get vehicleId from URL params
  const vehicleId = id; // Assign the extracted ID from URL to vehicleId

  const formatPriceRange = (prices) => {
    if (prices.length === 0) return '';

    const minPrice = prices[0];
    const maxPrice = prices[prices.length - 1];

    return minPrice === maxPrice
      ? `${formatPrice(minPrice)}`
      : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${vehicleId}`);
        console.log('Vehicle Data:', response.data); // Debugging: Log vehicle data
        setVehicle(response.data);
        fetchBrandName(response.data.brand_id); // Fetch brand name once vehicle data is fetched
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [vehicleId]); // Fetch vehicle data whenever vehicleId changes

  // Function to fetch brand name by brand ID
  const fetchBrandName = async (brandId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/brands/${brandId}`);
      console.log('Brand Data:', response.data); // Debugging: Log brand data
      setBrandName(response.data.name); // Update brandName state with fetched brand name
    } catch (error) {
      console.error('Error fetching brand name:', error);
      setBrandName('Unknown Brand'); // Default value if fetching fails
    }
  };

  // Function to format price in lakhs and crores
  const formatPrice = (price) => {
    if (price >= 10000000) {
      // If price is 1 crore or more
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      // If price is less than 1 crore
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  // Function to render Slider or single image
  const renderSliderOrImage = () => {
    if (!vehicle) {
      return <div>Loading...</div>;
    }

    const { images } = vehicle;

    // Settings for the Slider component
    const settings = {
      dots: false,
      infinite: images.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className="car-show">
        {/* Render the Slider only if there are multiple images */}
        {images.length > 1 ? (
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Car image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : (
          // Render single image if there's only one
          <img src={images[0]} alt="Car image" />
        )}
      </div>
    );
  };

  // Function to render transmission types dynamically
  const renderTransmissionTypes = () => {
    if (!vehicle || !vehicle.variants || vehicle.variants.length === 0) return null;

    // Map transmission codes to full names
    const transmissionTypeMap = {
      A: 'Automatic',
      M: 'Manual',
      AMT: 'Automated Manual Transmission',
      CVT: 'Continuously Variable Transmission',
      DCT: 'Dual-Clutch Transmission'
      // Add more mappings as needed
    };

    // Get unique transmission types from vehicle variants and map them to full names
    const transmissionTypes = [...new Set(vehicle.variants.flatMap(variant => variant.transmission_type))];
    const transmissionNames = transmissionTypes.map(type => transmissionTypeMap[type] || 'Unknown').join(' / ');

    return (
      <div className="feature-box">
        <img src="https://img.icons8.com/bubbles/60/000000/automatic-gearbox-warning.png" alt="feature icon" />
        <h4>{transmissionNames}</h4>
      </div>
    );
  };


  // Function to render engine size
  const renderEngineSize = () => {
    if (!vehicle || !vehicle.variants || vehicle.variants.length === 0) return null;

    // Get all engine sizes from the variants
    const engineSizes = vehicle.variants.map(variant => variant.engine_size);

    // Determine the minimum and maximum engine sizes
    const minEngineSize = Math.min(...engineSizes);
    const maxEngineSize = Math.max(...engineSizes);

    return (
      <h4>
        {minEngineSize === maxEngineSize ? `${minEngineSize} cc` : `${minEngineSize} - ${maxEngineSize} cc`}
      </h4>
    );
  };

  // Map vehicle_type codes to full names
  const vehicleTypeMap = {
    P: 'Petrol',
    D: 'Diesel',
    E: 'Electric'
    // Add more mappings as needed
  };

  // Component to render random star rating
  const RandomRate = () => {
    // Function to get a random star rating between 0 and 5
    const getRandomStarRating = () => {
      const randomValue = Math.random() * 5;
      return Math.floor(randomValue * 10) / 10; // Limit to one decimal place
    };

    // Function to retrieve or initialize stored rating for current vehicleId
    const getStoredRating = () => {
      const storedRating = localStorage.getItem(`vehicle_${vehicleId}_rating`);
      return storedRating ? parseFloat(storedRating) : null;
    };

    // State to hold the current rating
    const [rating, setRating] = useState(getStoredRating());

    // Effect to update localStorage when rating changes
    useEffect(() => {
      if (rating !== null) {
        localStorage.setItem(`vehicle_${vehicleId}_rating`, rating);
      }
    }, [rating, vehicleId]);

    // If rating is not stored or null, generate a new random rating
    const generateRating = () => {
      const newRating = getRandomStarRating();
      setRating(newRating);
    };

    // If no rating is stored, generate a new one
    if (rating === null) {
      generateRating();
    }

    return (
      <Rate value={rating} disabled allowHalf className="antd-rate" />
    );
  };

  // Render component
  return (
    <section className="car-banner" id="overview">
      <div className="car-intro">
        {renderSliderOrImage()}
        {/* Render vehicle details only if vehicle and brandName are available */}
        {vehicle && (
          <div className="car-body">
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{`${brandName} ${vehicle.name}`}</h1>
            <div className="rating">
              <RandomRate />
              <Typography.Text>
                <a href="#" title="200 reviews | 78 Ratings">200 reviews | 78 Ratings</a>
              </Typography.Text>
            </div>
            <h2 className="car-price"><i className="fa fa-inr" aria-hidden="true"></i> <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>₹ {vehicle && formatPriceRange(vehicle.variants.map(variant => variant.price))}*</span></h2>
            <span className="car-span">*Ex-Showroom price in Ahmedabad</span>
            <button className="offerBtn" fdprocessedid="hh7t5i">View More Offers</button>
            <span className="selling"><i className="fa fa-superpowers" aria-hidden="true"></i> 18498 Selling in November.</span>
          </div>
        )}
        <div className="car-box">
          {/* Static feature */}
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/top-hat.png" alt="feature icon" />
            <h4>1st Selling</h4>
          </div>

          {/* Render transmission types dynamically */}
          {renderTransmissionTypes()}

          {/* Render engine size */}
          <div className="feature-box">
            <img src="https://img.icons8.com/clouds/60/000000/dashboard.png" alt="feature icon" />
            {renderEngineSize()}
          </div>

          {/* Render vehicle type */}
          <div className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/gas-station.png" alt="feature icon" />
            <h4>{vehicle && vehicleTypeMap[vehicle.vehicle_type]}</h4>
          </div>
        </div>
      </div>
      <hr />
      <div className="car-review">
        {/* Render vehicle overview and specifications only if vehicle is available */}
        {vehicle && (
          <>
            <h3 className="title">{vehicle.name} Overview</h3>
            <p>{vehicle.overview}</p>
            <h3 className="title">{vehicle.name} Specification</h3>
            <p>India’s favourite vehicle gets a fresh design language that is youthful as well as upmarket. The interiors have been designed with a host of advanced features including a new cockpit design and a sporty steering wheel with cruise and audio controls and a seven-inch Smartplay Studio.</p>
          </>
        )}
      </div>
    </section>
  );
};

// SampleNextArrow and SamplePrevArrow components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: 2 }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: 2 }}
      onClick={onClick}
    />
  );
};

export default CarIntro;
