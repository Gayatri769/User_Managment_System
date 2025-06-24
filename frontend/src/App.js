import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/Home';
import UpdateUser from './pages/UpdateUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import AdminDashboard from './pages/AdminDashboard';    // create this component
// import TeacherDashboard from './pages/TeacherDashboard'; // create this component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/Home" />} />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />

        {/* Role-based dashboards */}
        <Route path="/home" element={<Home />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        
        {/* Uncomment and create these pages when ready */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> */}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;