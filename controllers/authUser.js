const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => 
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ 
      message: 'Signup successful', 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        created_at: user.created_at 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        created_at: user.created_at 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
