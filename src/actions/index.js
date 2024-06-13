// actions/index.js

import {
    FETCH_BRANDS_REQUEST,
    FETCH_BRANDS_SUCCESS,
    FETCH_BRANDS_FAILURE,
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE
  } from './brandActions'; // Import your action types from brandActions.js
  
  // Export action types
  export {
    FETCH_BRANDS_REQUEST,
    FETCH_BRANDS_SUCCESS,
    FETCH_BRANDS_FAILURE,
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE
  };
  
  // Export action creators
  export * from './brandActions';
  