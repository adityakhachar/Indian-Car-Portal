import React, { useState } from "react";
import { Button, Form, Input, Upload, message, Select, Modal, Radio } from "antd";
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";
import AdminHeader from '../../../components/AdminLayout/AdminHeader.jsx';
import Sidebar from "../../../components/AdminLayout/SideBar.jsx";

const { Option } = Select;

const vehicleTypes = [
    { value: "P", label: "Petrol" },
    { value: "D", label: "Diesel" },
    { value: "C", label: "CNG" },
    { value: "E", label: "Electric" },
    { value: "ED", label: "Electric + Diesel" },
    { value: "EP", label: "Electric + Petrol" },
];

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
const transmissions = [
    { value: "A", label: "Automatic" },
    { value: "M", label: "Manual" },
    { value: "I", label: "Intelligent Manual Transmission (IMT)" },
];

const AddVehicles = () => {
    const [form] = Form.useForm();
    const [images, setImages] = useState([]);
    const [variants, setVariants] = useState([
        { name: "", engineSize: "", transmissionType: "", price: "" },
    ]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [imageSource, setImageSource] = useState("link");
    const [imageLinks, setImageLinks] = useState([""]);

    const handleImageUpload = (info) => {
        setImages(info.fileList);
    };

    const handleVariantChange = (index, key, value) => {
        const updatedVariants = [...variants];
        updatedVariants[index][key] = value;
        setVariants(updatedVariants);
    };

    const addVariant = () => {
        setVariants([
            ...variants,
            { name: "", engineSize: "", transmissionType: "", price: "" },
        ]);
    };

    const removeVariant = (index) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    const onFinish = (values) => {
        console.log('Submitted values:', values);
        // Here you can handle the form submission
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await previewFile(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const previewFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result);
        });
    };

    const handleCancel = () => setPreviewVisible(false);

    const onImageSourceChange = (e) => {
        setImageSource(e.target.value);
    };

    const addImageLinkField = () => {
        setImageLinks([...imageLinks, ""]);
    };

    const handleImageLinkChange = (index, e) => {
        const newImageLinks = [...imageLinks];
        newImageLinks[index] = e.target.value;
        setImageLinks(newImageLinks);
    };

    const handleDeleteImage = (index) => {
        const updatedImageLinks = [...imageLinks];
        updatedImageLinks.splice(index, 1);
        setImageLinks(updatedImageLinks);
    };

    return (
        <div className="kaiadmin">
            <Sidebar />
            <div className="kaiadmin__content">
                <AdminHeader />
                <div style={{ margin: '20px auto', maxWidth: '800px', overflowY: 'auto' }}>
                    <Form
                        form={form}
                        name="addVehicle"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the vehicle name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Image Source" name="imageSource">
                            <Radio.Group onChange={onImageSourceChange} defaultValue="link">
                                <Radio.Button value="link">Image Link</Radio.Button>
                                <Radio.Button value="upload">Upload from Local</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        {imageSource === 'link' ? (
                            <>
                                {imageLinks.map((link, index) => (
                                    <div key={index}>
                                        <Form.Item name={`imageLink${index}`} label={`Image Link ${index + 1}`}>
                                            <Input onChange={(e) => handleImageLinkChange(index, e)} value={link} />
                                            {link && (
                                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                                    <img src={link} alt={`Vehicle ${index + 1}`} style={{ width: '100px' }} />
                                                    <Button type="text" onClick={() => handleDeleteImage(index)} icon={<DeleteOutlined />} style={{ marginLeft: '10px' }}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </Form.Item>
                                        {index === imageLinks.length - 1 && (
                                            <Button type="dashed" onClick={addImageLinkField} style={{ width: '100%', marginBottom: '20px' }} icon={<PlusOutlined />}>
                                                Add Image Link
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {imageLinks.length === 0 && (
                                    <Button type="dashed" onClick={addImageLinkField} style={{ width: '100%', marginBottom: '20px' }} icon={<PlusOutlined />}>
                                        Add Image Link
                                    </Button>
                                )}
                            </>
                        ) : (
                            <Form.Item name="image" label="Upload Images" valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload
                                    listType="picture-card"
                                    fileList={images}
                                    customRequest={() => { }}
                                    beforeUpload={() => false}
                                    onPreview={handlePreview}
                                    onChange={handleImageUpload}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        )}
                        <Form.Item label="Vehicle Type" name="vehicleType" rules={[{ required: true, message: 'Please select the vehicle type!' }]}>
                            <Select placeholder="Select vehicle type">
                                {vehicleTypes.map((option) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Transmission" name="transmission" rules={[{ required: true, message: 'Please select the transmission type!' }]}>
                            <Select placeholder="Select transmission">
                                {transmissions.map((option) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Engine Size" name="engineSize" rules={[{ required: true, message: 'Please enter the engine size!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Overview" name="overview" rules={[{ required: true, message: 'Please enter the overview!' }]}>
                            <Input.TextArea />
                        </Form.Item>
                        {variants.map((variant, index) => (
                            <div key={index}>
                                <Form.Item label={`Variant ${index + 1}`} style={{ marginBottom: 0 }}>
                                    <Input.Group compact>
                                        <Form.Item
                                            name={['variants', index, 'name']}
                                            noStyle
                                            rules={[{ required: true, message: 'Please enter the variant name!' }]}
                                        >
                                            <Input style={{ width: '40%' }} placeholder="Name" />
                                        </Form.Item>
                                        <Form.Item
                                            name={['variants', index, 'engineSize']}
                                            noStyle
                                            rules={[{ required: true, message: 'Please enter the engine size!' }]}
                                        >
                                            <Input style={{ width: '30%' }} placeholder="Engine Size" />
                                        </Form.Item>
                                        <Form.Item
                                            name={['variants', index, 'transmissionType']}
                                            noStyle
                                            rules={[{ required: true, message: 'Please select the transmission type!' }]}
                                        >
                                            <Select style={{ width: '30%' }} placeholder="Transmission Type">
                                                {transmissions.map((option) => (
                                                    <Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item
                                    name={['variants', index, 'price']}
                                    style={{ marginBottom: 0 }}
                                    rules={[{ required: true, message: 'Please enter the price!' }]}
                                >
                                    <Input addonBefore="Price" />
                                </Form.Item>
                                {variants.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => removeVariant(index)}
                                        style={{ margin: '0 8px' }}
                                    />
                                ) : null}
                            </div>
                        ))}
                        <Button type="dashed" onClick={addVariant} style={{ width: '100%', marginBottom: '20px' }} icon={<PlusOutlined />}>
                            Add Variant
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Form>
                    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default AddVehicles;
