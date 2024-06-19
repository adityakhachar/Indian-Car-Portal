import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import '../../assets/styles/UserStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarIntro = () => {
  const [vehicle, setVehicle] = useState(null);
  const [brandName, setBrandName] = useState(""); // State to store brand name
  const { id } = useParams(); // Get vehicleId from URL params
  const vehicleId = id; // Assign the extracted ID from URL to vehicleId

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

    const transmissionTypes = [...new Set(vehicle.variants.map(variant => variant.transmission))];
    
    return (
      <>
        {transmissionTypes.map((type, index) => (
          <div key={index} className="feature-box">
            <img src="https://img.icons8.com/bubbles/60/000000/automatic-gearbox-warning.png" alt="feature icon" />
            <h4>{type}</h4>
          </div>
        ))}
      </>
    );
  };

  // Function to render engine size
  const renderEngineSize = () => {
    if (!vehicle || !vehicle.variants || vehicle.variants.length === 0) return null;

    // Check if all engine sizes are the same
    const allSameEngineSize = vehicle.variants.every(variant => variant.engine_size === vehicle.variants[0].engine_size);

    return (
      <h4>
        {vehicle.variants[0].engine_size} {allSameEngineSize ? 'cc' : ` - ${vehicle.variants[1].engine_size} cc`}
      </h4>
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
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
              <a href="#" title="200 reviews | 78 Ratings">200 reviews | 78 Ratings</a>
            </div>
            <h2 className="car-price"><i className="fa fa-inr" aria-hidden="true"></i> <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>₹ {`${formatPrice(vehicle.variants[0].price)} - ${formatPrice(vehicle.variants[vehicle.variants.length - 1].price)}*`}</span></h2>
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
          <div className="feature-box">
  <img src="https://img.icons8.com/bubbles/60/000000/gas-station.png" alt="feature icon" />
  <h4>{vehicle && vehicle.vehicle_type}</h4>
</div>  
          
          {/* Render engine size */}
          <div className="feature-box">
            <img src="https://img.icons8.com/clouds/60/000000/dashboard.png" alt="feature icon" />
            {renderEngineSize()}
          </div>
          {renderTransmissionTypes()}
        
        </div>
      </div>
      <hr />
      <div className="car-review">
        {/* Render vehicle overview and specifications only if vehicle is available */}
        {vehicle && (
          <>
            <h3 className="title">Swift Overview</h3>
            <p>{vehicle.overview}</p>
            <h3 className="title">Swift Specification</h3>
            <p>India’s favourite hatchback gets a fresh design language that is youthful as well as upmarket. The interiors have been designed with a host of advanced features including a new cockpit design and a sporty steering wheel with cruise and audio controls and a seven-inch Smartplay Studio.</p>
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
