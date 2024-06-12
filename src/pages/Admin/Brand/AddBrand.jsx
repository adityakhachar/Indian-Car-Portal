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

  const onFinish = values => {
    console.log('Submitted values:', values);
    // Here you can handle the form submission
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
    setImageUrl(e.target.value);
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
              <Form.Item name="imageLink" label="Image Link" rules={[{ required: true, message: 'Please enter the image link!' }]}>
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
