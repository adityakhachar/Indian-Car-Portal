// actions/vehicleActions.js

// Define action types
export const FETCH_VEHICLES_REQUEST = 'FETCH_VEHICLES_REQUEST';
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_FAILURE = 'FETCH_VEHICLES_FAILURE';
export const ADD_VEHICLE_REQUEST = 'ADD_VEHICLE_REQUEST';
export const ADD_VEHICLE_SUCCESS = 'ADD_VEHICLE_SUCCESS';
export const ADD_VEHICLE_FAILURE = 'ADD_VEHICLE_FAILURE';

// Action creators for fetching vehicles
export const fetchVehiclesRequest = () => ({
  type: FETCH_VEHICLES_REQUEST
});

export const fetchVehiclesSuccess = (vehicles) => ({
  type: FETCH_VEHICLES_SUCCESS,
  payload: vehicles
});

export const fetchVehiclesFailure = (error) => ({
  type: FETCH_VEHICLES_FAILURE,
  payload: error
});

export const addVehicleRequest = () => ({
  type: ADD_VEHICLE_REQUEST
});

export const addVehicleSuccess = (vehicle) => ({
  type: ADD_VEHICLE_SUCCESS,
  payload: vehicle
});

export const addVehicleFailure = (error) => ({
  type: ADD_VEHICLE_FAILURE,
  payload: error
});

// Action creator for fetching vehicles
export const fetchVehicles = () => {
    return async (dispatch) => {
      dispatch(fetchVehiclesRequest()); // Dispatch the request action
  
      try {
        const response = await fetch("http://localhost:5000/api/vehicles");
        const data = await response.json(); // Parse the response data
  
        dispatch(fetchVehiclesSuccess(data)); // Dispatch the success action with the fetched data
      } catch (error) {
        dispatch(fetchVehiclesFailure(error.message)); // Dispatch the failure action with the error message
      }
    };
  };
  

// Action creator for adding a new vehicle
export const addVehicle = (vehicleData) => {
  return async (dispatch) => {
    dispatch(addVehicleRequest()); // Dispatch the request action

    try {
      const { name, imageLink } = vehicleData; // Destructure name and imageLink from vehicleData
      const payload = { name, image: imageLink }; // Ensure payload contains name and imageLink

      const response = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response data

      // Dispatch the success action with the received data
      dispatch(addVehicleSuccess(data));
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch(addVehicleFailure(error.message));
    }
  };
};
