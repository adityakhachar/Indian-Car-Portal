import React, { useEffect, useState } from 'react';
import { Button, Table, Select } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../../../actions/vehicleActions';

const { Option } = Select;

const Vehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vehicles, loading, error } = useSelector(state => state.vehicle);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  // Function to handle the click event and navigate to "/Admin/AddVehicle"
  const handleAddVehicleClick = () => {
    navigate("/Admin/AddVehicle");
  };

  // Extract unique brands from vehicles data
  useEffect(() => {
    const uniqueBrands = [...new Set(vehicles.map(vehicle => vehicle.brand))];
    setBrands(uniqueBrands);
  }, [vehicles]);

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
    }
  ];

  // Convert vehicles object to array
  const vehiclesArray = Object.values(vehicles);

  // Filter vehicles based on selected brand and car type
  const filteredVehicles = vehiclesArray.filter(vehicle => {
    if (selectedBrand && selectedCarType) {
      return vehicle.brand === selectedBrand && vehicle.carType === selectedCarType;
    } else if (selectedBrand) {
      return vehicle.brand === selectedBrand;
    } else if (selectedCarType) {
      return vehicle.carType === selectedCarType;
    }
    return true;
  });

  // Extract name, brand, and price for display
  const dataForDisplay = filteredVehicles.map(vehicle => ({
    key: vehicle._id, // Assuming _id is unique for each vehicle
    name: vehicle.name,
    brand: vehicle.brand,
    price: vehicle.price
  }));

  // Function to handle brand select change
  const handleBrandChange = value => {
    setSelectedBrand(value);
  };

  // Function to handle car type select change
  const handleCarTypeChange = value => {
    setSelectedCarType(value);
  };

  return (
    <div className="kaiadmin">
      <SideMenu />
      <div className="kaiadmin__content">
        <AdminHeader />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleAddVehicleClick}>Add Vehicle</Button>
        </div>
        <div style={{ margin: '20px auto', maxWidth: '800px' }}>
          <Select placeholder="Select Brand" style={{ width: 200, marginBottom: '10px' }} onChange={handleBrandChange}>
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
          <Table
            loading={loading}
            columns={columns}
            dataSource={dataForDisplay}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
