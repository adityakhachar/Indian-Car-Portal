// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // Import your root reducer here

// Create store
const store = configureStore({
  reducer: rootReducer
});

export default store;
