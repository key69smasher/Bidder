const Team = require('../models/Team');
const Player = require('../models/Player');

class TeamService {
  // Get all teams
  async getAllTeams() {
    try {
      const teams = await Team.find().sort({ createdAt: 1 });
      return teams;
    } catch (error) {
      console.error('Error getting all teams:', error);
      throw error;
    }
  }

  // Get team by ID
  async getTeamById(id) {
    try {
      const team = await Team.findById(id);
      if (!team) {
        throw new Error('Team not found');
      }
      return team;
    } catch (error) {
      console.error('Error getting team by ID:', error);
      throw error;
    }
  }

  // Create new team
  async createTeam(teamData) {
    try {
      const { name, budget } = teamData;

      // Validate required fields
      if (!name || !budget) {
        throw new Error('Name and budget are required');
      }

      // Validate budget
      if (budget <= 0) {
        throw new Error('Budget must be greater than 0');
      }

      // Check if team name already exists
      const existingTeam = await Team.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
      if (existingTeam) {
        throw new Error('Team name already exists');
      }

      const team = new Team({
        name,
        budget,
        remainingBudget: budget
      });

      await team.save();
      return team;

    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  // Update team
  async updateTeam(id, updateData) {
    try {
      const team = await Team.findById(id);
      if (!team) {
        throw new Error('Team not found');
      }

      // Don't allow updating budget if it would be less than spent amount
      if (updateData.budget !== undefined) {
        const players = await team.getPlayers();
        const totalSpent = players.reduce((sum, player) => sum + (player.soldPrice || 0), 0);
        
        if (updateData.budget < totalSpent) {
          throw new Error('New budget cannot be less than already spent amount');
        }

        // Update remaining budget accordingly
        updateData.remainingBudget = updateData.budget - totalSpent;
      }

      Object.assign(team, updateData);
      await team.save();
      return team;

    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

  // Delete team
  async deleteTeam(id) {
    try {
      const team = await Team.findById(id);
      if (!team) {
        throw new Error('Team not found');
      }

      // Check if team has players
      const players = await team.getPlayers();
      if (players.length > 0) {
        throw new Error('Cannot delete team with players. Transfer players first.');
      }

      await Team.findByIdAndDelete(id);
      return { success: true };

    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }

  // Get team with players
  async getTeamWithPlayers(id) {
    try {
      const team = await Team.findById(id);
      if (!team) {
        throw new Error('Team not found');
      }

      const players = await team.getPlayers();
      const stats = await team.getStats();

      return {
        ...team.toObject(),
        players: players.map(player => ({
          id: player._id,
          name: player.name,
          skills: player.skills,
          soldPrice: player.soldPrice,
          soldAt: player.soldAt
        })),
        stats
      };

    } catch (error) {
      console.error('Error getting team with players:', error);
      throw error;
    }
  }

  // Get team statistics
  async getTeamStats(id) {
    try {
      const team = await Team.findById(id);
      if (!team) {
        throw new Error('Team not found');
      }

      const stats = await team.getStats();
      return stats;

    } catch (error) {
      console.error('Error getting team stats:', error);
      throw error;
    }
  }

  // Get all teams with statistics
  async getAllTeamsWithStats() {
    try {
      const teams = await Team.find();
      const teamsWithStats = await Promise.all(
        teams.map(async (team) => {
          const stats = await team.getStats();
          return {
            ...team.toObject(),
            stats
          };
        })
      );

      return teamsWithStats;

    } catch (error) {
      console.error('Error getting all teams with stats:', error);
      throw error;
    }
  }

  // Transfer player between teams
  async transferPlayer(playerId, fromTeamId, toTeamId) {
    try {
      const player = await Player.findById(playerId);
      if (!player) {
        throw new Error('Player not found');
      }

      if (!player.isSold) {
        throw new Error('Player is not sold yet');
      }

      const fromTeam = await Team.findById(fromTeamId);
      const toTeam = await Team.findById(toTeamId);

      if (!fromTeam || !toTeam) {
        throw new Error('One or both teams not found');
      }

      if (player.teamId.toString() !== fromTeamId) {
        throw new Error('Player does not belong to the specified team');
      }

      // Check if toTeam has enough budget
      if (toTeam.remainingBudget < player.soldPrice) {
        throw new Error('Insufficient budget in destination team');
      }

      // Refund fromTeam
      await fromTeam.addBudget(player.soldPrice);

      // Charge toTeam
      await toTeam.deductBudget(player.soldPrice);

      // Transfer player
      player.teamId = toTeamId;
      await player.save();

      return {
        player: player.toObject(),
        fromTeam: fromTeam.toObject(),
        toTeam: toTeam.toObject()
      };

    } catch (error) {
      console.error('Error transferring player:', error);
      throw error;
    }
  }

  // Get team leaderboard
  async getTeamLeaderboard() {
    try {
      const teamsWithStats = await this.getAllTeamsWithStats();
      
      // Sort by total players, then by remaining budget
      const leaderboard = teamsWithStats.sort((a, b) => {
        if (a.stats.totalPlayers !== b.stats.totalPlayers) {
          return b.stats.totalPlayers - a.stats.totalPlayers;
        }
        return b.stats.remainingBudget - a.stats.remainingBudget;
      });

      return leaderboard.map((team, index) => ({
        ...team,
        rank: index + 1
      }));

    } catch (error) {
      console.error('Error getting team leaderboard:', error);
      throw error;
    }
  }
}

module.exports = new TeamService();
