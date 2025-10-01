const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Get all teams
router.get('/', teamController.getAllTeams);

// Get all teams with statistics
router.get('/stats', teamController.getAllTeamsWithStats);

// Get team leaderboard
router.get('/leaderboard', teamController.getTeamLeaderboard);

// Get team by ID
router.get('/:id', teamController.getTeamById);

// Get team with players
router.get('/:id/players', teamController.getTeamWithPlayers);

// Get team statistics
router.get('/:id/stats', teamController.getTeamStats);

// Create new team
router.post('/', teamController.createTeam);

// Update team
router.put('/:id', teamController.updateTeam);

// Delete team
router.delete('/:id', teamController.deleteTeam);

// Transfer player between teams
router.post('/transfer', teamController.transferPlayer);

module.exports = router;
