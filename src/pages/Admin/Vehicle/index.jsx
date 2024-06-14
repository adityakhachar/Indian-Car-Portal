import React, { useEffect, useState } from 'react';
import { Button, Table, Select } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles, fetchBrands } from '../../../actions/vehicleActions.js';

const { Option } = Select;

const Vehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vehicles, loading, error } = useSelector(state => ({
    vehicles: state.vehicle.vehicles,
    loading: state.vehicle.loading || state.brand.loading,
    error: state.vehicle.error || state.brand.error
  }));

  const brands = useSelector((state) => state.brand.brands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCarType, setSelectedCarType] = useState(null);

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchBrands());
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
    if (selectedBrand && selectedCarType) {
      return vehicle.brand === selectedBrand && vehicle.carType === selectedCarType;
    } else if (selectedBrand) {
      return vehicle.brand === selectedBrand;
    } else if (selectedCarType) {
      return vehicle.carType === selectedCarType;
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
            {uniqueBrands.map(brand => (
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
