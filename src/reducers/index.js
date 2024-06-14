// reducers/index.js

import { createReducer, combineReducers } from '@reduxjs/toolkit';
import brandReducer from './brandReducer'; // Import your brand reducer here
import vehicleReducer from './vehicleReducer';
// import Category from '../../backend/models/Category';
import categoryReducer from './categoryReducer';

// Combine reducers using createReducer from Redux Toolkit
const rootReducer = combineReducers({
  brand: brandReducer,
  vehicle: vehicleReducer,
  category: categoryReducer
  // Add more reducers if needed
});

export default rootReducer;
