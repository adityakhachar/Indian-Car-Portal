const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Create a new vehicle
router.post('/', vehicleController.createVehicle);

// Get all vehicles
router.get('/', vehicleController.getVehicles);

// Get count of cars for each brand
router.get('/brands/:id/cars', vehicleController.getBrandCarCount);

router.delete('/:vehicleId', vehicleController.deleteVehicle);


router.get('/:vehicleId', vehicleController.getVehicleById);


// Get vehicles by category ID
// Get vehicles by category ID
router.get('/byCategory/:categoryId', vehicleController.getVehiclesByCategory);



  // router.get('/brand/brandid/:brandID', vehicleController.getBrandNameByBrandId);

module.exports = router;
