import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Navbar from '../../components/UserLayout/Navbar'; // Corrected import path
import FooterComponent from '../../components/UserLayout/Footer';
import '../../assets/styles/UserStyle.css'; // Import the external CSS file
import CarIntro from '../../components/UserLayout/CarIntro';
import VarientsTable from '../../components/UserLayout/VarientsTable';

const { Content, Footer } = Layout;

const CheckOut = () => {
  // Default values for theme tokens (replace with actual values if using theme)
  const colorBgContainer = '#ffffff'; // Default background color
  const borderRadiusLG = '8px'; // Default border radius

  return (
    <Layout>
      <div style={{ backgroundColor: 'transparent', padding: 0 }}>
        <Navbar />
      </div>
      {/* <Advertisement /> */}
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0', textAlign: 'center' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Car</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span>
            <a href="#" className="link">
              Overview
            </a>
          </span>
          <span>
            <a href="#" className="link">
              Variant
            </a>
          </span>
          <span>
            <a href="#" className="link">
              Specification
            </a>
          </span>
          <span>
            <a href="#" className="link">
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
      <div class="adv-cars" style={{ marginTop: 30, padding: '0px 5%' }}>
        <img src="https://nandpalmohit.github.io/carsline/assets/adv/i20hr.jpg" width="100%" />
      </div>
        <div>
      <VarientsTable/>
      </div>
      <Footer style={{ textAlign: 'center' }}>
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default CheckOut;
