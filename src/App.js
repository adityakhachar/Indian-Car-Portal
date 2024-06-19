import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/Admin/Register'; // Correct import path
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Brand from './pages/Admin/Brand';
import AddBrand from './pages/Admin/Brand/AddBrand';
import Vehicle from './pages/Admin/Vehicle';
import AddVehicleForm from './pages/Admin/Vehicle/AddVehicle';
import ForgotPassword from './pages/Admin/ForgotPassword';
import UserDashboard from './pages/User/UserDashboard';
import CheckOut from './pages/User/CheckOut';
import CarIntro from './components/UserLayout/CarIntro';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin/register" element={<RegistrationPage />} /> {/* Correct route path */}
          <Route path="/" element={<AdminLogin />} /> 
          <Route path="/admin/login" element={<AdminLogin />} /> 
          <Route path="/dashboard" element={<AdminDashboard/>} />
          <Route path="/brands" element={<Brand/>} />
          <Route path="/Admin/AddBrand" element={<AddBrand/>} />
          <Route path="/Admin/Vehicles" element={<Vehicle/>}/>
          <Route path="/Admin/AddVehicle" element={<AddVehicleForm/>}/>
          <Route path="/Admin/forgotpass" element={<ForgotPassword/>}/>


          <Route path="/user" element={<UserDashboard/>}/>  
          <Route path="/cars/:id" element={<CheckOut/>}/>   
          <Route path="/carIntro" element={<CarIntro/>}/>          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
