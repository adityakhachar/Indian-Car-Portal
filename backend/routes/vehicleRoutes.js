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
router.get('/byCategory/:categoryId', async (req, res) => {
    try {
      const vehicles = await vehicleController.getVehiclesByCategory(req.params.categoryId);
      res.json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
  });


  // router.get('/brand/brandid/:brandID', vehicleController.getBrandNameByBrandId);

module.exports = router;
