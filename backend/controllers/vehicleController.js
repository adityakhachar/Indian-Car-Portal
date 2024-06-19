const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).send({ error: 'Failed to create vehicle' });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).send(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).send({ error: 'Failed to fetch vehicles' });
  }
};

exports.getBrandCarCount = async (req, res) => {
  try {
    const brandId = req.params.id;
    const vehicleCount = await Vehicle.countDocuments({ brand_id: brandId });
    res.json({ brandId, vehicleCount });
  } catch (error) {
    console.error('Error fetching brand car count:', error);
    res.status(500).json({ error: 'Failed to fetch brand car count' });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID format' });
    }

    const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};
exports.getVehiclesByCategory = async (categoryId) => {
  try {
    const vehicles = await Vehicle.find({ category_id: categoryId });
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles by category:', error);
    throw new Error('Failed to fetch vehicles by category');
  }
};
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

const getBrandNameByBrandId = async (req, res) => {
  const brandId = req.params.brandID;

  try {
    const response = await fetch('http://localhost:5000/api/brands'); // Adjust URL as per your API
    const brandsData = await response.json();

    // Find the brand with the matching brandId
    const brand = brandsData.find(brand => brand._id === brandId);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({ brandName: brand.name });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ message: 'Server error' });
  }
};