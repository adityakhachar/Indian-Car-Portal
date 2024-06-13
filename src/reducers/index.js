// reducers/index.js

import { createReducer, combineReducers } from '@reduxjs/toolkit';
import brandReducer from './brandReducer'; // Import your brand reducer here
import vehicleReducer from './vehicleReducer';

// Combine reducers using createReducer from Redux Toolkit
const rootReducer = combineReducers({
  brand: brandReducer,
  vehicle: vehicleReducer
  // Add more reducers if needed
});

export default rootReducer;
