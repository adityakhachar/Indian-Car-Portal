const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require("../models/Admin");
const jwt = require('jsonwebtoken');
const verifyToken = require('../VerifyToken');
const jwtSecret = "MyNameIsAdityaKhachar";
const app = express(); // Create an express app instance
var nodemailer = require('nodemailer');
app.set("view engine", "ejs"); // Set view engine to ejs
app.use(express.urlencoded({ extended: false }));
const crypto = require('crypto');
// const nodemailer = require('nodemailer');
require('dotenv').config();

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

app.get('/auth/protected-route', verifyToken, async (req, res) => {
  res.json({ message: 'Protected Admin route accessed successfully.', user: req.user });
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const olduser = await Admin.findOne({ email });
    if (!olduser) {
      return res.json({ status: "Admin not found" });
    }
    const secret = jwtSecret + olduser.password;
    const token = jwt.sign({ email: olduser.email, id: olduser._id }, secret, { expiresIn: "5m" });
    const link = `http://localhost:5000/api/admin/reset-password/${olduser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'adityarajcoder09@gmail.com',
        pass: 'gvksrridgzhadfsc'
      }
    });
    
    var mailOptions = {
      from: 'aditya.kce21@sot.pdpu.ac.in',
      to: 'adityakhachar15@gmail.com',
      subject: 'Reset Password',
      text: link
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log(link);
  } catch (error) {
    console.error(error);
  }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await Admin.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "Admin not found" });
  }
  const secret = jwtSecret + oldUser.password;
  try {
    console.log("verified")
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, id, token ,status:"Not verified"});
  } catch (error) {
    console.error(error);
    res.send("Not verified");
  }
});

app.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Check if the password field is provided
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Find the admin by id
    const oldUser = await Admin.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "Admin not Exists!" });
    }

    // Verify the token
    const secret = jwtSecret + oldUser.password;
    const verify = jwt.verify(token, secret);

    // Hash the new password
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("Encrypted Password:", encryptedPassword);

    // Update the password in the database
    await Admin.updateOne({ _id: id }, {
      $set: {
        password: encryptedPassword,
      }
    });

    // Respond with success message
    res.render("index", { email: verify.email, id, token ,status:"verified"});

  } catch (error) {
    console.error(error);
    res.send("Not verified");
  }
});

module.exports = app; // Export the express app instance
