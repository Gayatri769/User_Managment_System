import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  resetPassword,
  forgotPassword,
  updateUser,
} from '../controller/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/users', getAllUsers);

// Fixed routes: forgot-password with no :id param
router.post('/forgot-password', forgotPassword);

// Reset password expects token in URL param
router.post('/reset-password/:token', resetPassword);

router.put('/update-user/:id', updateUser);
router.post('/logout/:id', logoutUser);

export default router;
