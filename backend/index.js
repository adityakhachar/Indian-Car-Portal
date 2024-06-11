const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the MERN stack car portal!');
});

// // Example routes for Company and Employee (replace with your actual routes)
// const companyRoutes = require('./routes/company');
// const employeeRoutes = require('./routes/employee');
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
// app.use('/api/lo', adminRoutes);
// app.use('/api/employee', employeeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
