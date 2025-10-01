const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Team = require('../models/Team');

// Register a new team manager
router.post('/register', async (req, res) => {
  try {
    const { teamName, managerName, email, password } = req.body;

    // Validate required fields
    if (!teamName || !managerName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Team name, manager name, email, and password are required'
      });
    }

    // Check if team already exists
    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: 'Team already exists'
      });
    }

    // Create team (in real app, you'd also create user account)
    const team = new Team({
      name: teamName,
      budget: config.auction.defaultTeamBudget,
      remainingBudget: config.auction.defaultTeamBudget
    });

    await team.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        teamId: team._id, 
        teamName: team.name,
        role: 'manager',
        managerName,
        email
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.status(201).json({
      success: true,
      message: 'Team registered successfully',
      data: {
        team: team.toObject(),
        token,
        user: {
          teamId: team._id,
          teamName: team.name,
          managerName,
          email,
          role: 'manager'
        }
      }
    });

  } catch (error) {
    console.error('Error in team registration:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Login for team managers
router.post('/login', async (req, res) => {
  try {
    const { teamName, password } = req.body;

    // Validate required fields
    if (!teamName || !password) {
      return res.status(400).json({
        success: false,
        message: 'Team name and password are required'
      });
    }

    // Find team
    const team = await Team.findOne({ name: teamName });
    if (!team) {
      return res.status(401).json({
        success: false,
        message: 'Invalid team name or password'
      });
    }

    // In a real app, you'd verify password hash here
    // For demo purposes, we'll accept any password
    if (!password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid team name or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        teamId: team._id, 
        teamName: team.name,
        role: 'manager'
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        team: team.toObject(),
        token,
        user: {
          teamId: team._id,
          teamName: team.name,
          role: 'manager'
        }
      }
    });

  } catch (error) {
    console.error('Error in team login:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Login for auctioneer
router.post('/auctioneer/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // In a real app, you'd verify against user database
    // For demo purposes, we'll use hardcoded credentials
    if (username === 'auctioneer' && password === 'admin123') {
      const token = jwt.sign(
        { 
          username,
          role: 'auctioneer'
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      res.status(200).json({
        success: true,
        message: 'Auctioneer login successful',
        data: {
          token,
          user: {
            username,
            role: 'auctioneer'
          }
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

  } catch (error) {
    console.error('Error in auctioneer login:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    
    res.status(200).json({
      success: true,
      data: decoded
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

module.exports = router;


