import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        alert("check you mail");
      const response = await fetch('http://localhost:5000/api/admin/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data,"User register");
        // handle successful request (e.g., show a message)
        alert("Password reset link sent to your email.");
        alert(data.status);
        // navigate('/');
      } else {
        // handle error based on response status
        alert(data.message || "Email not found.");
      }
    } catch (error) {
      // handle fetch error
      console.error("Error during password reset:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'sans-serif', color: '#4a5568', padding: '5rem' }}>
      <div style={{ maxWidth: '28rem', width: '100%', margin: 'auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', position: 'relative', marginTop: '3rem', backgroundColor: '#fff', borderRadius: '0.75rem' }}>
        <div style={{ backgroundColor: '#fff', width: '5rem', height: '5rem', borderWidth: '0.5rem', padding: '0.375rem', position: 'absolute', left: '0', right: '0', margin: 'auto', top: '1rem', borderRadius: '50%' }}>
          <a href="javascript:void(0)">
            <img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" style={{ width: '100%', display: 'inline-block' }} />
          </a>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: '4.5rem', padding: '2rem', paddingRight: '2rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#718096', marginBottom: '2rem', textAlign: 'center' }}>Forgot Password</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: '#edf2f7', width: '100%', padding: '1rem', fontSize: '0.875rem', border: '1px solid transparent', transition: 'background-color 0.3s, border-color 0.3s', borderRadius: '0.375rem' }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" style={{ width: '100%', padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#fff', backgroundColor: '#ed8936', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s' }}>
              Reset Password
            </button>
          </div>
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
            <a href="/" style={{ color: '#ed8936', fontWeight: '600', textDecoration: 'none', transition: 'color 0.3s' }}>Back to Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
