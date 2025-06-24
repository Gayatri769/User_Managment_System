import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // default import, not named
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const url="https://user-managment-system-6lsj.onrender.com"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role selected
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send role along with email & password
      const response = await axios.post('url/api/auth/login', { email, password, role });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);

        // Decode JWT to get user role from token
        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        alert('Login successful!');

        // Redirect based on role from token, fallback to selected role
        if (userRole === 'admin') {
          navigate('/home');
        } else if (userRole === 'teacher') {
          navigate('/home');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 text-primary">Welcome Back 👋</h3>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Role selection dropdown */}
          <div className="mb-4">
            <label className="form-label">Select Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="text-center mt-3">
            <small className="text-muted">
              Forgot Password? <a href="/forgot-password">Click here</a>
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account? <a href="/register">Register</a>
            </small>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
