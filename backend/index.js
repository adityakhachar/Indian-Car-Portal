const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

// Import routes
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const cityPriceRoutes = require('./routes/cityPriceRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the MERN stack car portal!');
});

// Use routes
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes); // Make sure this line is correct
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/cityprices', cityPriceRoutes);

// Start server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
