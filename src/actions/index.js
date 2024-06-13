// actions/index.js

import {
    FETCH_BRANDS_REQUEST,
    FETCH_BRANDS_SUCCESS,
    FETCH_BRANDS_FAILURE,
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE
  } from './brandActions'; // Import your brand action types
  
  import {
    FETCH_VEHICLES_REQUEST,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FAILURE,
    ADD_VEHICLE_REQUEST,
    ADD_VEHICLE_SUCCESS,
    ADD_VEHICLE_FAILURE
  } from './vehicleActions'; // Import your vehicle action types
  
  // Export brand action types
  export {
    FETCH_BRANDS_REQUEST,
    FETCH_BRANDS_SUCCESS,
    FETCH_BRANDS_FAILURE,
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE
  };
  
  // Export vehicle action types
  export {
    FETCH_VEHICLES_REQUEST,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FAILURE,
    ADD_VEHICLE_REQUEST,
    ADD_VEHICLE_SUCCESS,
    ADD_VEHICLE_FAILURE
  };
  
  // Export brand action creators
  export * from './brandActions';
  
  // Export vehicle action creators
  export * from './vehicleActions';
  