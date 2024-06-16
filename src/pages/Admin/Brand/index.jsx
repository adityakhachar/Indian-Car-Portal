import React, { useEffect } from 'react';
import { Button, Table, Spin, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, deleteBrand } from '../../../actions/brandActions';
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';

const Brand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands, loading, error } = useSelector(state => state.brand);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleAddBrandClick = () => {
    navigate("/Admin/AddBrand");
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(deleteBrand(brandId))
      .then(() => {
        message.success('Brand deleted successfully');
      })
      .catch((error) => {
        message.error(`Failed to delete brand: ${error.message}`);
      });
  };

  const columns = [
    {
      title: 'Brand Image',
      dataIndex: 'image',
      key: 'image',
      align: 'left',
      render: (image) => <img src={image} alt="Brand" style={{ width: '50px', borderRadius: '50%', textAlign: 'center' }} />
    },
    {
      title: 'Brand Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>
    },
    {
      title: 'Number of Cars',
      dataIndex: 'carCount',
      key: 'carCount',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure delete this brand?"
          onConfirm={() => handleDeleteBrand(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" style={{ color: 'red' }}>Delete</Button>
        </Popconfirm>
      ),
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
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table
              loading={loading}
              columns={columns}
              dataSource={brands}
              pagination={false}
              rowClassName={() => 'antd-table-row'}
            />
          )}
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Brand;
