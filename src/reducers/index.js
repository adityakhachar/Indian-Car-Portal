// reducers/index.js

import { createReducer, combineReducers } from '@reduxjs/toolkit';
import brandReducer from './brandReducer'; // Import your brand reducer here

// Combine reducers using createReducer from Redux Toolkit
const rootReducer = combineReducers({
  brand: brandReducer,
  // Add more reducers if needed
});

export default rootReducer;
