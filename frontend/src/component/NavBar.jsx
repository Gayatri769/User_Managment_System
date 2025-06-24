import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand text-dark fw-bold" to="/">
        User Management
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
  
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/forgot-password">
              Forgot Password
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/reset-password/:token">
              Reset Password
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
