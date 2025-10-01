// Authentication middleware (for future use)
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.user = user;
    next();
  });
};

// Check if user is auctioneer
const requireAuctioneer = (req, res, next) => {
  if (!req.user || req.user.role !== 'auctioneer') {
    return res.status(403).json({
      success: false,
      message: 'Auctioneer access required'
    });
  }
  next();
};

// Check if user is team manager
const requireTeamManager = (req, res, next) => {
  if (!req.user || req.user.role !== 'manager') {
    return res.status(403).json({
      success: false,
      message: 'Team manager access required'
    });
  }
  next();
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  requireAuctioneer,
  requireTeamManager,
  optionalAuth
};
