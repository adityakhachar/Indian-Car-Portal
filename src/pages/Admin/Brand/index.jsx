import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';
// import brandData from './brandData'; // Sample brand data (replace with actual data)

const Brand = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(true);
    // // Simulating fetching data from an API
    // setTimeout(() => {
    //   setBrands(brandData); // Set brands data
    //   setLoading(false);
    // }, 1000); // Adjust the time as per your requirement
  }, []);

  // Function to handle the click event and navigate to "/Admin/AddBrand"
  const handleAddBrandClick = () => {
    navigate("/Admin/AddBrand");
  };

  const columns = [
    {
      title: 'Brand Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Brand" style={{ width: '50px', borderRadius: '50%' }} />
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of Cars',
      dataIndex: 'cars',
      key: 'cars',
    },
  ];

  return (
    <div className="kaiadmin">
      <SideMenu />
      <div className="kaiadmin__content">
        <AdminHeader />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleAddBrandClick}>Add Brand</Button>
        </div>
        <div style={{ margin: '20px auto', maxWidth: '800px' }}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={brands}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Brand;
