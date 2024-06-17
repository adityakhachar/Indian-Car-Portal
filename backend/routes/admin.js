const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const verifyToken = require('../VerifyToken');
const jwtSecret = "MyNameIsAdityaKhachar";

const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

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


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Save reset token and expiry in user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'SendGrid', // Use the appropriate SMTP service
      auth: {
        user: 'your_sendgrid_username', // Replace with your SMTP username/API key
        pass: 'your_sendgrid_password_or_api_key' // Replace with your SMTP password/API key
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'your_email@example.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://localhost:3000/reset/${resetToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent.' });

  } catch (err) {
    console.error('Error in forgot password:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
module.exports = router;