const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// Get all players
router.get('/', playerController.getAllPlayers);

// Get available players
router.get('/available', playerController.getAvailablePlayers);

// Get sold players
router.get('/sold', playerController.getSoldPlayers);

// Search players
router.get('/search', playerController.searchPlayers);

// Get player statistics
router.get('/stats', playerController.getPlayerStats);

// Get player by ID
router.get('/:id', playerController.getPlayerById);

// Create new player
router.post('/', playerController.createPlayer);

// Update player
router.put('/:id', playerController.updatePlayer);

// Delete player
router.delete('/:id', playerController.deletePlayer);

// Get players by team
router.get('/team/:teamId', playerController.getPlayersByTeam);

module.exports = router;
