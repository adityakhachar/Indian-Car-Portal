import React, { useEffect, useState } from 'react';
import { Button, Table, Select } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, fetchBrands, fetchCategories } from '../../../actions';

const { Option } = Select;

const Vehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vehicles, loading, error } = useSelector(state => ({
    vehicles: state.vehicle.vehicles,
    loading: state.vehicle.loading || state.brand.loading || state.category.loading,
    error: state.vehicle.error || state.brand.error || state.category.error
  }));

  const brands = useSelector((state) => state.brand.brands);
  const categories = useSelector((state) => state.category.categories);
  
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchBrands());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddVehicleClick = () => {
    navigate("/Admin/AddVehicle");
  };

  const uniqueBrands = brands.map(brand => brand.name);

  const columns = [
    {
      title: 'Vehicle Image',
      dataIndex: 'images',
      render: (images) => (
        <img src={images[0]} alt="vehicle" style={{ width: '100px' }} />
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand_id',
      render: (brand_id) => {
        const foundBrand = brands.find(brand => brand._id === brand_id);
        return foundBrand ? foundBrand.name : 'Unknown';
      },
    },
    {
      title: 'Model',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fuel Type',
      dataIndex: 'vehicle_type',
      render: (vehicle_type) => {
        const fuelTypeAbbreviations = {
          P: 'Petrol',
          D: 'Diesel',
          C: 'CNG',
          A: 'Automatic',
          M: 'Manual',
          I: 'IMT',
        };
        return vehicle_type
          .map((type) => fuelTypeAbbreviations[type])
          .join(', ');
      },
    },
    {
      title: 'Transmission',
      dataIndex: 'transmission',
      render: (transmission) => {
        const transmissionAbbreviations = {
          A: 'Automatic',
          M: 'Manual',
          I: 'IMT',
        };
        return transmission
          .map((type) => transmissionAbbreviations[type])
          .join(', ');
      },
    },
    {
      title: 'Price',
      dataIndex: 'variants',
      render: (variants) => variants[0].price,
    },
  ];

  const vehiclesArray = Object.values(vehicles);

  const filteredVehicles = vehiclesArray.filter(vehicle => {
    if (selectedBrand && selectedCategory) {
      return brands.find(brand => brand._id === vehicle.brand_id)?.name === selectedBrand && vehicle.category_id === selectedCategory;
    } else if (selectedBrand) {
      return brands.find(brand => brand._id === vehicle.brand_id)?.name === selectedBrand;
    } else if (selectedCategory) {
      return vehicle.category_id === selectedCategory;
    }
    return true;
  });

  const dataForDisplay = filteredVehicles.map(vehicle => ({
    key: vehicle._id,
    name: vehicle.name,
    brand_id: vehicle.brand_id,
    images: vehicle.images,
    vehicle_type: vehicle.vehicle_type,
    transmission: vehicle.transmission,
    variants: vehicle.variants,
  }));

  const handleBrandChange = value => {
    setSelectedBrand(value);
  };

  const handleCategoryChange = value => {
    setSelectedCategory(value);
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
          <Select 
            placeholder="Select Brand" 
            style={{ width: 200, marginBottom: '10px' }} 
            onChange={handleBrandChange}
            allowClear
          >
            <Option value={null}>All Brands</Option>
            {uniqueBrands.map(brand => (
              <Option key={brand} value={brand}>{brand}</Option>
            ))}
          </Select>
          <Select 
            placeholder="Select Category" 
            style={{ width: 200, marginBottom: '10px' }} 
            onChange={handleCategoryChange}
            allowClear
          >
            <Option value={null}>All Categories</Option>
            {categories.map(category => (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            ))}
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
