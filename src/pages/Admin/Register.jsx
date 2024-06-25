import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://indian-car-portal.onrender.com/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, cpassword })
      });

      const data = await response.json();

      if (response.status === 201) {
        alert("Registration Success!!");
        navigate('/');
      } else if (response.status === 400 && data.error === "Passwords do not match") {
        alert("Passwords do not match with Confirm Password");
      } else if (response.status === 400 && data.error === "Admin already exists") {
        alert("You are already registered!!");
      } else {
        alert("Server Error!!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'sans-serif', color: '#4a5568', padding: '0rem' }}>
      <div style={{ maxWidth: '28rem', width: '100%', margin: 'auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', position: 'relative', marginTop: '3rem', backgroundColor: '#fff', borderRadius: '0.75rem' }}>
        {/* Removed overflow: hidden from the parent div */}
        <div style={{ backgroundColor: '#fff', width: '5rem', height: '5rem', borderWidth: '0.5rem', padding: '0.375rem', position: 'absolute', left: '0', right: '0', margin: 'auto', top: '1rem', borderRadius: '50%' }}>
          <a href="javascript:void(0)">
            <img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" style={{ width: '100%', display: 'inline-block' }} />
          </a>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '4.5rem', padding: '2rem', paddingRight: '2rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#718096', marginBottom: '2rem', textAlign: 'center' }}>Create Free Account</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: '#edf2f7', width: '100%', padding: '1rem', fontSize: '0.875rem', border: '1px solid transparent', transition: 'background-color 0.3s, border-color 0.3s', borderRadius: '0.375rem' }}
              placeholder="Enter name"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#edf2f7', width: '100%', padding: '1rem', fontSize: '0.875rem', border: '1px solid transparent', transition: 'background-color 0.3s, border-color 0.3s', borderRadius: '0.375rem' }}
              placeholder="Enter email"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: '#edf2f7', width: '100%', padding: '1rem', fontSize: '0.875rem', border: '1px solid transparent', transition: 'background-color 0.3s, border-color 0.3s', borderRadius: '0.375rem' }}
              placeholder="Enter password"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              name="cpassword"
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              style={{ backgroundColor: '#edf2f7', width: '100%', padding: '1rem', fontSize: '0.875rem', border: '1px solid transparent', transition: 'background-color 0.3s, border-color 0.3s', borderRadius: '0.375rem' }}
              placeholder="Enter confirm password"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{ width: '1rem', height: '1rem', borderWidth: '1px', borderStyle: 'solid', borderColor: '#cbd5e0', borderRadius: '2px', transition: 'background-color 0.3s, border-color 0.3s' }}
            />
            <label htmlFor="terms" style={{ marginLeft: '0.75rem', fontSize: '0.875rem' }}>
              I accept the <a href="javascript:void(0);" style={{ color: '#ed8936', fontWeight: '600', textDecoration: 'none', transition: 'color 0.3s' }}>Terms and Conditions</a>
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={!termsAccepted}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#fff',
                backgroundColor: termsAccepted ? '#ed8936' : '#ccc',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: termsAccepted ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s'
              }}
            >
              Create an account
            </button>
          </div>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
            Already have an account? <a href="/" style={{ color: '#ed8936', fontWeight: '600', textDecoration: 'none', transition: 'color 0.3s' }}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
