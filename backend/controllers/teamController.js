const teamService = require('../services/teamService');

class TeamController {
  // Get all teams
  async getAllTeams(req, res) {
    try {
      const teams = await teamService.getAllTeams();

      res.status(200).json({
        success: true,
        data: teams
      });

    } catch (error) {
      console.error('Error in getAllTeams controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get team by ID
  async getTeamById(req, res) {
    try {
      const { id } = req.params;
      const team = await teamService.getTeamById(id);

      res.status(200).json({
        success: true,
        data: team
      });

    } catch (error) {
      console.error('Error in getTeamById controller:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Create new team
  async createTeam(req, res) {
    try {
      const { name, budget } = req.body;

      if (!name || !budget) {
        return res.status(400).json({
          success: false,
          message: 'Name and budget are required'
        });
      }

      const team = await teamService.createTeam({
        name,
        budget
      });

      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        data: team
      });

    } catch (error) {
      console.error('Error in createTeam controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update team
  async updateTeam(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const team = await teamService.updateTeam(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Team updated successfully',
        data: team
      });

    } catch (error) {
      console.error('Error in updateTeam controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete team
  async deleteTeam(req, res) {
    try {
      const { id } = req.params;
      await teamService.deleteTeam(id);

      res.status(200).json({
        success: true,
        message: 'Team deleted successfully'
      });

    } catch (error) {
      console.error('Error in deleteTeam controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get team with players
  async getTeamWithPlayers(req, res) {
    try {
      const { id } = req.params;
      const team = await teamService.getTeamWithPlayers(id);

      res.status(200).json({
        success: true,
        data: team
      });

    } catch (error) {
      console.error('Error in getTeamWithPlayers controller:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get team statistics
  async getTeamStats(req, res) {
    try {
      const { id } = req.params;
      const stats = await teamService.getTeamStats(id);

      res.status(200).json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('Error in getTeamStats controller:', error);
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get all teams with statistics
  async getAllTeamsWithStats(req, res) {
    try {
      const teams = await teamService.getAllTeamsWithStats();

      res.status(200).json({
        success: true,
        data: teams
      });

    } catch (error) {
      console.error('Error in getAllTeamsWithStats controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Transfer player between teams
  async transferPlayer(req, res) {
    try {
      const { playerId, fromTeamId, toTeamId } = req.body;

      if (!playerId || !fromTeamId || !toTeamId) {
        return res.status(400).json({
          success: false,
          message: 'Player ID, from team ID, and to team ID are required'
        });
      }

      const result = await teamService.transferPlayer(playerId, fromTeamId, toTeamId);

      res.status(200).json({
        success: true,
        message: 'Player transferred successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in transferPlayer controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get team leaderboard
  async getTeamLeaderboard(req, res) {
    try {
      const leaderboard = await teamService.getTeamLeaderboard();

      res.status(200).json({
        success: true,
        data: leaderboard
      });

    } catch (error) {
      console.error('Error in getTeamLeaderboard controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TeamController();
