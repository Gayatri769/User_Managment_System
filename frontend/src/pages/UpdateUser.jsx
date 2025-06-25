import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  //const url="https://user-managment-system-6lsj.onrender.com"
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user details
    axios.get(`https://user-managment-system-6lsj.onrender.com/api/auth/users`)
      .then(res => {
        const found = res.data.find(u => u._id === id);
        if (found) setUser(found);
        else setError('User not found');
      })
      .catch(() => setError('Failed to fetch user'));
  }, [id]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`url/api/auth/update-user/${id}`, user);
      alert('User updated!');
      navigate('/');
    } catch {
      setError('Update failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Update User</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label>Name</label>
          <input name="name" className="form-control" value={user.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" className="form-control" value={user.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={user.role} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
