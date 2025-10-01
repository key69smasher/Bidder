const playerService = require('../services/playerService');

class PlayerController {
  // Get all players
  async getAllPlayers(req, res) {
    try {
      const players = await playerService.getAllPlayers();

      res.status(200).json({
        success: true,
        data: players
      });

    } catch (error) {
      console.error('Error in getAllPlayers controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get available players
  async getAvailablePlayers(req, res) {
    try {
      const players = await playerService.getAvailablePlayers();

      res.status(200).json({
        success: true,
        data: players
      });

    } catch (error) {
      console.error('Error in getAvailablePlayers controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get sold players
  async getSoldPlayers(req, res) {
    try {
      const players = await playerService.getSoldPlayers();

      res.status(200).json({
        success: true,
        data: players
      });

    } catch (error) {
      console.error('Error in getSoldPlayers controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get player by ID
  async getPlayerById(req, res) {
    try {
      const { id } = req.params;
      const player = await playerService.getPlayerById(id);

      res.status(200).json({
        success: true,
        data: player
      });

    } catch (error) {
      console.error('Error in getPlayerById controller:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Create new player
  async createPlayer(req, res) {
    try {
      const { name, skills, basePrice } = req.body;

      if (!name || !skills || !basePrice) {
        return res.status(400).json({
          success: false,
          message: 'Name, skills, and base price are required'
        });
      }

      const player = await playerService.createPlayer({
        name,
        skills,
        basePrice
      });

      res.status(201).json({
        success: true,
        message: 'Player created successfully',
        data: player
      });

    } catch (error) {
      console.error('Error in createPlayer controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update player
  async updatePlayer(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const player = await playerService.updatePlayer(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Player updated successfully',
        data: player
      });

    } catch (error) {
      console.error('Error in updatePlayer controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete player
  async deletePlayer(req, res) {
    try {
      const { id } = req.params;
      await playerService.deletePlayer(id);

      res.status(200).json({
        success: true,
        message: 'Player deleted successfully'
      });

    } catch (error) {
      console.error('Error in deletePlayer controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get players by team
  async getPlayersByTeam(req, res) {
    try {
      const { teamId } = req.params;
      const players = await playerService.getPlayersByTeam(teamId);

      res.status(200).json({
        success: true,
        data: players
      });

    } catch (error) {
      console.error('Error in getPlayersByTeam controller:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get player statistics
  async getPlayerStats(req, res) {
    try {
      const stats = await playerService.getPlayerStats();

      res.status(200).json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('Error in getPlayerStats controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Search players
  async searchPlayers(req, res) {
    try {
      const { q } = req.query;
      const players = await playerService.searchPlayers(q);

      res.status(200).json({
        success: true,
        data: players
      });

    } catch (error) {
      console.error('Error in searchPlayers controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new PlayerController();
