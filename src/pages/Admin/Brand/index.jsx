import React, { useEffect } from 'react';
import { Button, Table, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchBrands } from '../../../actions/brandActions.js'; // Import fetchBrands action creator
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';

const Brand = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector(state => state.brand); // Get brands and loading state from Redux store

  useEffect(() => {
    // Dispatch fetchBrands action on component mount
    dispatch(fetchBrands());
  }, [dispatch]);

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
      dataIndex: 'carCount', // Update dataIndex to match the key used in the brands array
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
        {loading ? ( // Display a spinner while loading
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
    <Spin size="large" />
  </div>
) : (
            <Table
              loading={loading}
              columns={columns}
              dataSource={brands}
              pagination={false}
            />
          )}
          {error && <div>Error: {error}</div>} {/* Display error message if there's an error */}
        </div>
      </div>
    </div>
  );
};

export default Brand;
