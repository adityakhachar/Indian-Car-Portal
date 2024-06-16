const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const verifyToken = require('../VerifyToken');
const jwtSecret = "MyNameIsAdityaKhachar";

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;

    // Check if passwords match
    if (password !== cpassword) {
      return res.status(401).json({ error: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword // Store the hashed password
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password incorrect.' });
    }

    // Generate JWT token
    const data = {
      user: {
        id: admin.id,
        name: admin.name
      }
    };
    const authToken = jwt.sign(data, jwtSecret);

    // Return the admin object and authToken if login is successful
    res.status(200).json({ admin, authToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

router.get('/auth/protected-route', verifyToken, async (req, res) => {
  res.json({ message: 'Protected Admin route accessed successfully.', user: req.user });
});

module.exports = router;