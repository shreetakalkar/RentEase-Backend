const Owner = require('../models/ownerModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.ownerSignup = async (req, res, next) => {
  const { name, email, password, mobile_no, hotel_name, address } = req.body;

  if (!name || !email || !password || !mobile_no || !hotel_name || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (await Owner.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    if (await Owner.findOne({ mobile_no })) {
      return res.status(400).json({ message: 'Mobile number already in use' });
    }

    const owner = await Owner.create({ name, email, password, mobile_no, hotel_name, address });
    const token = generateToken(owner._id);
    
    res.status(201).json({ message: 'Signup successful', token });
  } catch (error) {
    next(error);
  }
};

exports.ownerLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const owner = await Owner.findOne({ email });
    if (!owner || !(await owner.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = generateToken(owner._id);
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};
