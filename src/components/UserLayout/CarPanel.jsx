import React, { useState, useEffect } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import '../../assets/styles/Panel.css'; // Import your CSS file

const CarPanel = () => {
  const [activeTab, setActiveTab] = useState(''); // State to manage active tab
  const [categories, setCategories] = useState([]); // State to store categories
  const [vehicles, setVehicles] = useState([]);
  const [newvehicles, setNewvehicles] = useState([]); // State to store vehicles based on activeTab
  const [brands, setBrands] = useState([]); // State to store brands
  const [showMoreBrands, setShowMoreBrands] = useState(false); // State to manage showing more brands
  const [currentCategoryName, setCurrentCategoryName] = useState(''); // State to store current category name
  const [currentMonth, setCurrentMonth] = useState(''); // State to store current month
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:5000/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const brandsResponse = await fetch('http://localhost:5000/api/brands');
        const brandsData = await brandsResponse.json();
        setBrands(brandsData);

        // Set the first category as activeTab on initial load
        if (categoriesData.length > 0) {
          const firstCategory = categoriesData[0];
          setActiveTab(firstCategory._id);
          setCurrentCategoryName(firstCategory.name);
          fetchVehiclesByCategory(firstCategory._id); // Fetch vehicles initially for the first category
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchVehiclesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/byCategory/${categoryId}`);
      const vehiclesData = await response.json();

      // Sort vehicles by launch date in descending order
      vehiclesData.sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate));

      setVehicles(vehiclesData);
    } catch (error) {
      console.error(`Error fetching vehicles for category ${currentCategoryName}:`, error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicles');
      const vehiclesData = await response.json();

      // Get the last 4 cars and reverse them to get in descending order
      const lastFourVehicles = vehiclesData.slice(-4).reverse();

      setNewvehicles(lastFourVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} Crore`;
    } else {
      return `${(price / 100000).toFixed(1)} Lakh`;
    }
  };

  const handleTabClick = async (categoryId, categoryName) => {
    setActiveTab(categoryId);
    setCurrentCategoryName(categoryName);
    await fetchVehiclesByCategory(categoryId);
  };

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

  return (
    <div style={{ padding: "0px 5%" }}>
      <div className="panel">
        <div className="panel" id="brands">
          <h3>Top Brands</h3>
          <div className="brandcontent">
            {brands.slice(0, showMoreBrands ? brands.length : 12).map(brand => (
              <div className="brand_cards" key={brand._id}>
                <img src={brand.image} alt={brand.name} />
              </div>
            ))}
          </div><br/>
          {brands.length > 12 && (
            <div className="show-more-brands">
              <button className='link' onClick={() => setShowMoreBrands(!showMoreBrands)}>
                {showMoreBrands ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </div><br/>
        <h3 id="newCars">New Cars Of {currentYear}</h3>
        <div className="tabcontent">
          {newvehicles.length > 0 ? (
            newvehicles.map(vehicle => (
              <div key={vehicle._id} className="cards">
                <h5 className="badge">Just Launched</h5>
                <img src={vehicle.images[0]} alt="" width="100%" style={{objectFit: "contain"}}/>
                <div className="card-data">
                  <a href={`cars/${vehicle._id}`}>{vehicle.name}</a>
                  <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.city_price[0].price)} <span>onwards</span></h4>
                  <span className="card-para">*Ex-showroom price in {vehicle.city_price[0].name}</span>
                  <a href={`cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found for {currentCategoryName}</p>
          )}
        </div>
        <br/><br/>
        <div className="adv-cars" style={{ marginTop: 30 }}>
          <img src="https://nandpalmohit.github.io/carsline/assets/adv/i20hr.jpg" width="100%" />
        </div><br/><br/>
        <div className="panel" style={{ borderRadius: "10px", backgroundColor: "#fff", width: "100%", position: "relative", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }} id="cars">
          <h3>All Cars</h3>
          <div className="tabs">
            {categories.map(category => (
              <button
                key={category._id}
                className={`tablink ${activeTab === category._id ? 'active' : ''}`}
                onClick={() => handleTabClick(category._id, category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="tabcontent">
            {vehicles.length > 0 ? (
              vehicles.map(vehicle => (
                <div key={vehicle._id} className="cards">
                  <h5 className="badge">{vehicle.engine_size} cc </h5>
                  <img src={vehicle.images[0]} alt={vehicle.name} style={{ objectFit: "contain" }} />
                  <div className="card-data">
                    <a href={`/cars/${vehicle._id}`}>{brands.find(brand => brand._id === vehicle.brand_id)?.name} {vehicle.name}</a>
                    <h4><i className="fa fa-inr" aria-hidden="true"></i> {formatPrice(vehicle.city_price[0].price)} <span>onwards</span></h4>
                    <span className="card-para">*Ex-showroom price in {vehicle.city_price[0].name}</span>
                    <a href={`/cars/${vehicle._id}`} className="link">Check Out More <ArrowRightOutlined /></a>
                  </div>
                </div>
              ))
            ) : (
              <p>No vehicles found for {currentCategoryName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPanel;
