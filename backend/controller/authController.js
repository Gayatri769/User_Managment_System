import jsonwebtoken from 'jsonwebtoken';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js'; // ✅ CORRECTED: Keep this in backend, not frontend path

const ALLOWED_ROLES = ['admin', 'teacher', 'student'];

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jsonwebtoken.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: { id: newUser._id, name, email, role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jsonwebtoken.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  if (role && !ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }

  try {
    const updateData = { name, email };
    if (role) updateData.role = role;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    const { password, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout (no-op, for frontend token removal)
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};

// Forgot password (send reset email with token)
export const forgotPassword = async (req, res) => {

  //console.log('Forgot password request received:', req.body);
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '15m' }
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const html = `
      <h3>Password Reset Request</h3>
      <p>Hi ${user.name},</p>
      <p>You requested a password reset. Click the button below to set a new password:</p>
      <a href="${resetLink}" style="padding:10px 15px;background:#007bff;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
      <p>This link is valid for 15 minutes.</p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `;

    await sendEmail(user.email, 'Reset Your Password', html);

    res.status(200).json({ message: 'Password reset link sent to email.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reset password with token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_RESET_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Invalid or expired reset token:', error);
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

