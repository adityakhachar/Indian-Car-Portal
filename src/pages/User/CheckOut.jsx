import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Navbar from '../../components/UserLayout/Navbar'; // Corrected import path
import FooterComponent from '../../components/UserLayout/Footer';
import '../../assets/styles/UserStyle.css'; // Import the external CSS file
import CarIntro from '../../components/UserLayout/CarIntro';
import VarientsTable from '../../components/UserLayout/VarientsTable';
import CarColors from '../../components/UserLayout/CarColors';
import SpecificationTable from '../../components/UserLayout/SpecificationTable';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ImageSlideshow from '../../components/UserLayout/ImageSlideShow';
const { Content, Footer } = Layout;

const CheckOut = () => {
  const images = [
    'https://nandpalmohit.github.io/carsline/assets/adv/i20hr.jpg',
    'https://nandpalmohit.github.io/carsline/assets/adv/magnite.jpg', // Add more images as needed
    'https://nandpalmohit.github.io/carsline/assets/adv/creta.jpg',
  ];

  const [vehicleName, setVehicleName] = useState(null);
  const { id } = useParams(); // Get vehicleId from URL params
  const vehicleId = id;
  // Default values for theme tokens (replace with actual values if using theme)
  const colorBgContainer = '#ffffff'; // Default background color
  const borderRadiusLG = '8px'; // Default border radius
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vehicles/${vehicleId}`);
        console.log('Vehicle Dataaaa:', response.data.name); // Debugging: Log vehicle data
        setVehicleName(response.data.name);
        // fetchBrandName(response.data.brand_id); // Fetch brand name once vehicle data is fetched
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };
    fetchVehicle();
  }, [vehicleId]); 
  return (
    <Layout>
      <div style={{ backgroundColor: 'transparent', padding: 0 }}>
        <Navbar />
      </div>
      {/* <Advertisement /> */}
      <Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0', textAlign: 'center' }}>
      <Breadcrumb.Item>
        <Link to="/user">Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
      <Link to="/user/#cars">All Car</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{vehicleName}</Breadcrumb.Item>
    </Breadcrumb>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span>
            <a href="#" className="link">
              Overview
            </a>
          </span>
          <span>
            <a href="#varients" className="link">
              Variant
            </a>
          </span>
          <span>
            <a href="#specs" className="link">
              Specification
            </a>
          </span>
          <span>
            <a href="#colors" className="link">
              Colors
            </a>
          </span>
        </div>
      </Content>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Example shadow
        }}
      >
        <CarIntro />

        {/* Other content of your application */}
      </div>
      <ImageSlideshow images={images} />
        <div id='varients'>
      <VarientsTable/>
      </div>
      <div id='specs'>
        <SpecificationTable/>
      </div>
      <div id='colors'>
        <CarColors/>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default CheckOut;
