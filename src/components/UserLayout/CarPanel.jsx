import React, { useState, useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import '../../assets/styles/Panel.css'; // Import your CSS file

const CarPanel = () => {
  const [activeTab, setActiveTab] = useState('Sedan'); // State to manage active tab (set default to 'Sedan')
  const [categories, setCategories] = useState([]); // State to store categories
  const [vehicles, setVehicles] = useState([]); // State to store vehicles based on activeTab
  const [brands, setBrands] = useState({}); // State to store brands
  const [currentMonth, setCurrentMonth] = useState(''); // State to store current month

  useEffect(() => {
    // Function to get current month name
    const getCurrentMonth = () => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const now = new Date();
      return months[now.getMonth()];
    };

    setCurrentMonth(getCurrentMonth());
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const categoriesData = await response.json();
        setCategories(categoriesData);

        // Find the category ID for Sedan and set it as the activeTab by default
        const sedanCategory = categoriesData.find(category => category.name === 'Sedan');
        if (sedanCategory) {
          setActiveTab(sedanCategory._id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVehiclesByCategory = async (categoryId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/vehicles/byCategory/${categoryId}`);
        const vehiclesData = await response.json();
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    if (activeTab) {
      fetchVehiclesByCategory(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/brands');
        const brandsData = await response.json();
        // Create a brand map for quick lookup by brand id
        const brandMap = brandsData.reduce((acc, brand) => {
          acc[brand._id] = brand.name;
          return acc;
        }, {});
        setBrands(brandMap);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

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

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId); // Update active tab based on button click
  };

  return (
    <div style={{ padding: "0px 5%" }}>
      <div className="panel" style={{ borderRadius: "10px", backgroundColor: "#fff", width: "100%", position: "relative", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }}>
        <h3>Top Selling Cars in {currentMonth}</h3>
        <div className="tabs">
          {categories.map(category => (
            <button
              key={category._id}
              className={`tablink ${activeTab === category._id ? 'active' : ''}`}
              onClick={() => handleTabClick(category._id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="tabcontent" id="topSellCars">
          {/* Display vehicles based on activeTab */}
          {vehicles.length > 0 ? (
            vehicles.map(vehicle => (
              <div key={vehicle._id} className="cards">
                <h5 className="badge">99</h5>
                <img src={vehicle.images[0]} alt={vehicle.name} className="card-img" />
                <div className="card-data">
                  <a href={`/cars/${vehicle._id}`}>{brands[vehicle.brand_id]} {vehicle.name}</a>
                  <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.variants[0].price)} <span>onwards</span></h4>
                  <span className="card-para">*Ex-showroom price in Ahmedabad</span>
                  <a href={`/cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found for category: {activeTab}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarPanel;
