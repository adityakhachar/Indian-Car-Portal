import React, { useEffect, useState } from 'react';
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';

const Brand = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/brands", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // console.log({data});
        const data = await response.json();
        console.log(data);

        // Iterate through each brand to fetch the car count
        const brandsWithCarCount = await Promise.all(data.map(async (brand) => {
          const carCountResponse = await fetch(`http://localhost:5000/api/vehicles/brands/${brand._id}/cars`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!carCountResponse.ok) {
            throw new Error(`HTTP error! Status: ${carCountResponse.status}`);
          }

          const carCountData = await carCountResponse.json();
          console.log(carCountData);
          return { ...brand, carCount: carCountData.vehicleCount };
        }));

        setBrands(brandsWithCarCount);
        setLoading(false);
      } catch (error) {
        console.error('Error loading brand data:', error);
        setLoading(false);
        // Handle error appropriately, such as setting an error state or displaying a message to the user
      }
    };

    fetchBrands();
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
      dataIndex: 'carCount', // Update from 'cars' to 'carCount'
      key: 'carCount',
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
