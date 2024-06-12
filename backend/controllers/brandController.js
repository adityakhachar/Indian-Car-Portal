const Brand = require('../models/Brand');

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body);
        await brand.save();
        res.status(201).send(brand);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extract validation errors from the error object
            const validationErrors = {};
            for (let field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            res.status(400).json({ error: 'Validation error', details: validationErrors });
        } else {
            res.status(500).send(error);
        }
    }
};


// Get all brands
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).send(brands);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// Get brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).send('Brand not found');
        }
        res.send(brand);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


