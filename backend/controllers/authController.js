const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    // Check if user exists
    const userExists = await User.findOne({ email })
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password
    })
    
    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        },
        token: generateToken(user._id)
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Check for user email
    const user = await User.findOne({ email }).select('+password')
    
    if (user && (await user.comparePassword(password))) {
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        },
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  register,
  login,
  getMe
}