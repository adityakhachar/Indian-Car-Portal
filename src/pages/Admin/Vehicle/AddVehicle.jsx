import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVehicle } from "../../../actions/index";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AppHeader from '../../../components/AdminLayout/AdminHeader.jsx';
import SideMenu from "../../../components/AdminLayout/SideBar.jsx";

const { Option } = Select;

const vehicleTypes = [
  { value: "P", label: "Petrol" },
  { value: "D", label: "Diesel" },
  { value: "C", label: "CNG" },
  { value: "E", label: "Electric" },
];

const transmissions = [
  { value: "A", label: "Automatic" },
  { value: "M", label: "Manual" },
  { value: "I", label: "Intelligent Manual Transmission (IMT)" },
];

const cities = ["Ahmedabad", "Mumbai", "Delhi"]; // List of cities

const AddVehicles = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([
    { name: "", engineSize: "", transmissionType: "", price: "" },
  ]);
  const [cityPrices, setCityPrices] = useState([{ city: "", price: "" }]);
  const [colors, setColors] = useState([{ name: "", image_url: "" }]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchBrands = () => {
    fetch("http://localhost:5000/api/brands")
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands:", error));
  };

  const handleImageUpload = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-3); // Limit to 3 images
    fileList = fileList.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file.originFileObj),
    }));
    setImages(fileList);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImagePreview = () => {
    if (imageUrl.trim() !== "") {
      const newImage = {
        uid: Date.now(),
        name: "image.png",
        status: "done",
        url: imageUrl.trim(),
      };
      setImages([...images, newImage]);
      setImageUrl("");
    }
  };

  const handleDeleteImage = (uid) => {
    const filteredImages = images.filter((image) => image.uid !== uid);
    setImages(filteredImages);
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
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleCityPriceChange = (index, field, value) => {
    const updatedCityPrices = [...cityPrices];
    updatedCityPrices[index][field] = value;
    setCityPrices(updatedCityPrices);
  };

  const addCityPrice = () => {
    if (cityPrices.length < 3) {
      setCityPrices([...cityPrices, { city: "", price: "" }]);
    }
  };

  const removeCityPrice = (index) => {
    if (cityPrices.length > 1) {
      const updatedCityPrices = [...cityPrices];
      updatedCityPrices.splice(index, 1);
      setCityPrices(updatedCityPrices);
    }
  };

  const handleColorChange = (index, key, value) => {
    const updatedColors = [...colors];
    updatedColors[index][key] = value;
    setColors(updatedColors);
  };

  const addColor = () => {
    setColors([...colors, { name: "", image_url: "" }]);
  };

  const removeColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const handleSubmit = (values) => {
    const {
      brand,
      category,
      name,
      imageUrl,
      vehicleType,
      transmission,
      engineSize,
      overview,
      variants, // Ensure this is properly structured
      cityPrices,
      colors
    } = values;
  
    // Format transmission as an array if it's a single value
    const formattedTransmission = Array.isArray(transmission) ? transmission : [transmission];
  
    // Format variants array correctly
    const formattedVariants = variants.map(variant => ({
      name: variant.name,
      engine_size: variant.engineSize || '', // Ensure engine_size is not undefined
      transmission_type: Array.isArray(variant.transmissionType) ? variant.transmissionType : [variant.transmissionType || ''], // Ensure transmission_type is an array and not undefined
      price: variant.price
    }));
  
    // Prepare the data object to send to the server
    const data = {
      category_id: category,
      brand_id: brand,
      name,
      images: [{ url: imageUrl }], // Assuming imageUrl is a string for a single image
      vehicle_type: vehicleType,
      transmission: formattedTransmission,
      engine_size: engineSize,
      overview,
      variants: formattedVariants, // Use the formatted variants array
      city_price: cityPrices.map(({ city, price }) => ({ name: city, price })),
      colors,
    };
  
    console.log("Data to be sent:", data); // Log data to inspect before sending
  
    // Dispatch action to add vehicle
    dispatch(addVehicle(data));
  };
  
  return (
    <div className="kaiadmin" style={{ display: "flex", justifyContent: "center" }}>
      <SideMenu />
      <div className="kaiadmin__content" style={{ width: "100%", maxWidth: "1200px" }}>
        <AppHeader />
        <div>
          <Row justify="center">
            <Col span={18}>
              <Typography.Title level={4} style={{ textAlign: "center" }}>Add Vehicle</Typography.Title>
              <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ transmission: "A" }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[{ required: true, message: "Please select brand!" }]}
                >
                  <Select>
                    {brands.map((brand) => (
                      <Option key={brand._id} value={brand._id}>
                        {brand.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "Please select category!" },
                  ]}
                >
                  <Select>
                    {categories.map((cat) => (
                      <Option key={cat._id} value={cat._id}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter vehicle name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Image URL"
                  name="imageUrl"
                >
                  <Input
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    addonAfter={
                      <Button
                        onClick={handleImagePreview}
                        disabled={!imageUrl.trim()}
                      >
                        Add Url Image
                      </Button>
                    }
                  />
                </Form.Item>
                <Form.Item label="Upload from Device">
                  <Upload
                    onChange={handleImageUpload}
                    multiple
                    maxCount={3}
                    beforeUpload={() => false}
                    fileList={images}
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                {images.map((image) => (
                  <div key={image.uid} style={{ position: "relative" }}>
                    <img
                      src={image.url}
                      alt={`Image ${image.uid}`}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginRight: "10px",
                      }}
                    />
                    <Button
                      style={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => handleDeleteImage(image.uid)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                <Form.Item
                  label="Vehicle Type"
                  name="vehicleType"
                  rules={[
                    { required: true, message: "Please select vehicle type!" },
                  ]}
                >
                  <Select>
                    {vehicleTypes.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Transmission"
                  name="transmission"
                  rules={[
                    { required: true, message: "Please select transmission!" },
                  ]}
                >
                  <Select>
                    {transmissions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Engine Size"
                  name="engineSize"
                  rules={[
                    { required: true, message: "Please enter engine size!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Overview"
                  name="overview"
                  rules={[
                    { required: true, message: "Please enter vehicle overview!" },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
                {variants.map((variant, index) => (
                  <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                    <Typography.Title level={5}>Variant {index + 1}</Typography.Title>
                    <Row gutter={16}>
                      <Col span={6}>
                        <Form.Item
                          label="Name"
                          name={['variants', index, 'name']}
                          rules={[{ required: true, message: 'Please enter variant name!' }]}
                        >
                          <Input onChange={(e) => handleVariantChange(index, 'name', e.target.value)} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Engine Size"
                          name={['variants', index, 'engineSize']}
                          rules={[{ required: true, message: 'Please enter engine size!' }]}
                        >
                          <Input onChange={(e) => handleVariantChange(index, 'engineSize', e.target.value)} />
                        </Form.Item>
                        <Form.Item
                          label="Transmission Type"
                          name={['variants', index, 'transmissionType']}
                          rules={[{ required: true, message: 'Please select transmission type!' }]}
                        >
                          <Select onChange={(value) => handleVariantChange(index, 'transmissionType', value)}>
                            {transmissions.map((option) => (
                              <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Price"
                          name={['variants', index, 'price']}
                          rules={[{ required: true, message: 'Please enter variant price!' }]}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            onChange={(value) => handleVariantChange(index, 'price', value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={1} style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Button
                          type="danger"
                          icon={<MinusCircleOutlined />}
                          onClick={() => removeVariant(index)}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={addVariant} block icon={<PlusOutlined />}>
                    Add Variant
                  </Button>
                </Form.Item>
                <Form.Item label="City Prices">
                  {cityPrices.map((cityPrice, index) => (
                    <Row key={index} gutter={16} style={{ marginBottom: "10px" }}>
                      <Col span={10}>
                        <Form.Item
                          label="City"
                          name={['cityPrices', index, 'city']}
                          rules={[{ required: true, message: 'Please select city!' }]}
                        >
                          <Select onChange={(value) => handleCityPriceChange(index, 'city', value)}>
                            {cities.map((city) => (
                              <Option key={city} value={city}>{city}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="Price"
                          name={['cityPrices', index, 'price']}
                          rules={[{ required: true, message: 'Please enter price!' }]}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            onChange={(value) => handleCityPriceChange(index, 'price', value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          type="danger"
                          icon={<MinusCircleOutlined />}
                          onClick={() => removeCityPrice(index)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={addCityPrice} block icon={<PlusOutlined />}>
                      Add City Price
                    </Button>
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Color Options">
                  {colors.map((color, index) => (
                    <Row key={index} gutter={16} style={{ marginBottom: "10px" }}>
                      <Col span={10}>
                        <Form.Item
                          label="Color Name"
                          name={['colors', index, 'name']}
                          rules={[{ required: true, message: 'Please enter color name!' }]}
                        >
                          <Input onChange={(e) => handleColorChange(index, 'name', e.target.value)} />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="Image URL"
                          name={['colors', index, 'image_url']}
                          rules={[{ required: true, message: 'Please enter image URL!' }]}
                        >
                          <Input onChange={(e) => handleColorChange(index, 'image_url', e.target.value)} />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          type="danger"
                          icon={<MinusCircleOutlined />}
                          onClick={() => removeColor(index)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={addColor} block icon={<PlusOutlined />}>
                      Add Color Option
                    </Button>
                  </Form.Item>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Add Vehicle
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AddVehicles;
