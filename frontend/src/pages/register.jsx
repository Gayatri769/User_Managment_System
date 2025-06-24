import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Register = () => {
  const url="https://user-managment-system-6lsj.onrender.com"
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('url/api/auth/register', {
        name,
        email,
        password,
        role
      });
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '450px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4 text-success">Create an Account 📝</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
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

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
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

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100 mt-2">
            Register
          </button>

          {/* Link to Login */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account? <a href="/login">Login</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
