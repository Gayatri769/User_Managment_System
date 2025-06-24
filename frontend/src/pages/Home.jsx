import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Navbar from "../component/NavBar";

const roleBadgeColors = {
  admin: 'danger',
  teacher: 'info',
  student: 'success',
};

const Home = () => {
  const url="https://user-managment-system-6lsj.onrender.com"
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('url/api/auth/users');
      setUsers(response.data.map(user => ({ ...user, loggedIn: true })));
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users.');
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  const handleForgotPassword = async (email) => {
    try {
      await axios.post(`url/api/auth/forgot-password`, { email });
      alert('Forgot password email sent.');
    } catch (err) {
      console.error(err);
      alert('Failed to send forgot password request.');
    }
  };

  const handleResetPassword = (userId) => {
    setSelectedUserId(userId);
    setShowResetModal(true);
  };

  const handleConfirmReset = async () => {
    if (!newPassword.trim()) {
      alert('Password cannot be empty.');
      return;
    }
    try {
      await axios.post(`url/api/auth/reset-password/${selectedUserId}`, { newPassword });
      alert('Password reset successful.');
    } catch (err) {
      console.error(err);
      alert('Password reset failed.');
    } finally {
      setShowResetModal(false);
      setNewPassword('');
    }
  };

  const handleLogout = async (userId) => {
    if (window.confirm('Are you sure you want to logout this user?')) {
      try {
        await axios.post(`url/api/auth/logout/${userId}`);
        alert('User logged out successfully.');
        setUsers(prevUsers => prevUsers.map(user =>
          user._id === userId ? { ...user, loggedIn: false } : user
        ));
      } catch (err) {
        console.error(err);
        alert('Logout failed.');
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center text-primary mb-4">👥 User Management Dashboard</h2>

        <div className="text-center mb-4">
          <button className="btn btn-success btn-lg px-5" onClick={fetchUsers}>
            <i className="bi bi-people-fill me-2"></i>Fetch Users
          </button>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="row g-4">
          {users.filter(user => user.loggedIn).map((user) => (
            <div className="col-md-6 col-lg-4" key={user._id}>
              <div
                className="card shadow-sm h-100 border border-dark"
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#fff',
                  color: '#000',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">
                    <i className="bi bi-person-circle me-2"></i> {user.name}
                  </h5>
                  <p className="mb-1">
                    <i className="bi bi-envelope-fill me-2 text-dark"></i>
                    <span>{user.email}</span>
                  </p>
                  <p>
                    <span
                      className={`badge bg-${roleBadgeColors[user.role] || 'secondary'} text-uppercase`}
                      style={{ fontWeight: '600', letterSpacing: '0.05em', color: '#fff' }}
                    >
                      {user.role || 'N/A'}
                    </span>
                  </p>

                  <div className="mt-auto d-grid gap-2">
                    <button
                      className="btn btn-outline-dark btn-lg px-4"
                      onClick={() => handleUpdate(user._id)}
                    >
                      <i className="bi bi-pencil-square me-1"></i>Update
                    </button>
                    <button
                      className="btn btn-outline-dark btn-lg px-4"
                      onClick={() => handleForgotPassword(user.email)}
                    >
                      <i className="bi bi-envelope-exclamation me-1"></i>Forgot Password
                    </button>
                    <button
                      className="btn btn-outline-dark btn-lg px-4"
                      onClick={() => handleResetPassword(user._id)}
                    >
                      <i className="bi bi-arrow-repeat me-1"></i>Reset Password
                    </button>
                    <button
                      className="btn btn-outline-dark btn-lg px-4"
                      onClick={() => handleLogout(user._id)}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reset Password Modal */}
        <Modal show={showResetModal} onHide={() => setShowResetModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>🔐 Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowResetModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmReset}>
              Confirm Reset
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Home;
