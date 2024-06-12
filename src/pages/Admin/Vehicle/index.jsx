import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Select } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';
// import brandData from './brandData'; // Sample brand data (replace with actual data)
// import vehicleData from './vehicleData'; // Sample vehicle data (replace with actual data)

const { Option } = Select;

const Vehicle = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(true);
    // // Simulating fetching data from an API
    // setTimeout(() => {
    //   setBrands(brandData); // Set brands data
    //   setFilteredVehicles(vehicleData); // Set vehicles data
    //   setLoading(false);
    // }, 1000); // Adjust the time as per your requirement
  }, []);

  // Function to handle the click event and navigate to "/Admin/AddVehicle"
  const handleAddVehicleClick = () => {
    navigate("/Admin/AddVehicle");
  };

  // Function to filter vehicles based on brand and car type
  const filterVehicles = () => {
    // let filtered = vehicleData;
    // if (selectedBrand) {
    //   filtered = filtered.filter(vehicle => vehicle.brand === selectedBrand);
    // }
    // if (selectedCarType) {
    //   filtered = filtered.filter(vehicle => vehicle.carType === selectedCarType);
    // }
    // setFilteredVehicles(filtered);
  };

  // Function to handle brand select change
  const handleBrandChange = value => {
    setSelectedBrand(value);
    filterVehicles();
  };

  // Function to handle car type select change
  const handleCarTypeChange = value => {
    setSelectedCarType(value);
    filterVehicles();
  };

  const columns = [
    {
      title: 'Vehicle Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Number of Variants',
      dataIndex: 'variants',
      key: 'variants',
    },
  ];

  return (
    <div className="kaiadmin">
      <SideMenu />
      <div className="kaiadmin__content">
        <AdminHeader />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleAddVehicleClick}>Add Vehicle</Button>
        </div>
        <div style={{ margin: '20px auto', maxWidth: '800px' }}>
          <Space>
            <Select placeholder="Select Brand" style={{ width: 200 }} onChange={handleBrandChange}>
              {brands.map(brand => (
                <Option key={brand} value={brand}>{brand}</Option>
              ))}
            </Select>
            <Select placeholder="Select Car Type" style={{ width: 200 }} onChange={handleCarTypeChange}>
              <Option value="Sedan">Sedan</Option>
              <Option value="SUV">SUV</Option>
              <Option value="Hatchback">Hatchback</Option>
              <Option value="Compact Sedan">Compact Sedan</Option>
              <Option value="Compact SUV">Compact SUV</Option>
              <Option value="Convertible">Convertible</Option>
            </Select>
          </Space>
          <Table
            loading={loading}
            columns={columns}
            dataSource={filteredVehicles}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
