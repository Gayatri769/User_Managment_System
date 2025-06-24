import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  //const url="https://user-managment-system-6lsj.onrender.com"
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await axios.post('https://user-managment-system-6lsj.onrender.com/api/auth/forgot-password', { email });
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send forgot password email.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-warning" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default ForgotPassword;
