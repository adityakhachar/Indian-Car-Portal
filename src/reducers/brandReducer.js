// reducers/brandReducer.js
import {
    FETCH_BRANDS_REQUEST,
    FETCH_BRANDS_SUCCESS,
    FETCH_BRANDS_FAILURE,
    ADD_BRAND_REQUEST,
    ADD_BRAND_SUCCESS,
    ADD_BRAND_FAILURE
  } from '../actions'; // Import action types
  
  // Initial state
  const initialState = {
    brands: [],
    loading: false,
    error: null
  };
  
  // Reducer function
  const brandReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BRANDS_REQUEST:
      case ADD_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_BRANDS_SUCCESS:
        return {
          ...state,
          loading: false,
          brands: action.payload,
          error: null
        };
      case FETCH_BRANDS_FAILURE:
      case ADD_BRAND_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case ADD_BRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default brandReducer;
  