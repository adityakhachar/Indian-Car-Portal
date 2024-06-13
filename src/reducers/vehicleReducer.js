// reducers/vehicleReducer.js

import {
    FETCH_VEHICLES_REQUEST,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FAILURE,
  } from '../actions';
  
  const initialState = {
    vehicles: [],
    loading: false,
    error: null
  };
  
  const vehicleReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_VEHICLES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_VEHICLES_SUCCESS:
        return {
          ...state,
          loading: false,
          vehicles: action.payload, // Ensure payload is an array of objects
          error: null
        };
      case FETCH_VEHICLES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default vehicleReducer;
  