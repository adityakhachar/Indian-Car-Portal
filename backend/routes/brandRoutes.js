const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Create a new brand
router.post('/', brandController.createBrand);

// Get all brands
router.get('/', brandController.getBrands);

// Get number of cars by brand ID

// Get brand by ID
// router.get('/:brandId', brandController.getBrandCarCount);



module.exports = router;
