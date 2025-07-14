const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token provided in request');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded.userId) {
      console.log('No userId in decoded token');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Convert userId to ObjectId
    try {
      const userId = new mongoose.Types.ObjectId(decoded.userId);
      req.user = { userId };
      console.log('User authenticated:', userId);
      next();
    } catch (error) {
      console.error('Invalid userId format:', decoded.userId);
      return res.status(401).json({ message: 'Invalid user ID format' });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 