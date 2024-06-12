import React, { useState } from 'react';
import { Button, Form, Input, Upload, message, Modal, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';

const AddBrand = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [imageSource, setImageSource] = useState('link');

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await previewFile(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const previewFile = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const onFinish = async values => {
    try {
      // Extract name and image from the form values
      const { name, imageLink } = values;
  
      // Create a payload object with the extracted data
      const payload = {
        name: name,
        image: imageLink ? imageLink : imageUrl // Use imageLink if available, otherwise use imageUrl
      };
  
      // Make a POST request to the backend API to create a new brand
      const response = await fetch("http://localhost:5000/api/brands", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      // Parse the response data
      const data = await response.json();
  
      // Check if the response is successful
      if (!response.ok) {
        // Handle different error scenarios...
        // (Same error handling logic as before)
      }
  
      // Log the response data
      console.log('Brand created:', data);
  
      // Show success message to the user
      message.success('Brand created successfully!');
    } catch (error) {
      // If an error occurs, log the error and show error message to the user
      console.error('Error creating brand:', error);
      message.error('Failed to create brand. Please try again later.');
    }
  };
  


  

  

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onImageSourceChange = e => {
    setImageSource(e.target.value);
  };

  const handleImageLinkChange = e => {
    const url = e.target.value.trim(); // Remove leading/trailing spaces
    setImageUrl(url); // Update imageUrl state variable
  };

  return (
    <div className="kaiadmin">
      <SideMenu />
      <div className="kaiadmin__content">
        <AdminHeader />
        <div style={{ margin: '20px auto', maxWidth: '800px' }}>
          <Form form={form} name="addBrand" onFinish={onFinish} layout="vertical">
            <Form.Item name="imageSource" label="Image Source" initialValue="link">
              <Radio.Group onChange={onImageSourceChange}>
                <Radio.Button value="link">Image Link</Radio.Button>
                <Radio.Button value="upload">Upload from Local</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {imageSource === 'link' ? (
              <Form.Item
                name="imageLink"
                label="Image Link"
              >
                <Input onChange={handleImageLinkChange} />
                {imageUrl && <img src={imageUrl} alt="Brand" style={{ marginTop: '10px', width: '100px' }} />}
              </Form.Item>
            ) : (
              <Form.Item
                name="image"
                label="Brand Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Please upload the brand image!' }]}
              >
                <Upload
                  listType="picture-card"
                  customRequest={() => {}}
                  beforeUpload={() => false}
                  onPreview={handlePreview}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            )}
            <Form.Item name="name" label="Brand Name" rules={[{ required: true, message: 'Please enter the brand name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
