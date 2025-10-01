const Player = require('../models/Player');
const Team = require('../models/Team');

class PlayerService {
  // Get all players
  async getAllPlayers() {
    try {
      const players = await Player.find().sort({ createdAt: 1 });
      return players;
    } catch (error) {
      console.error('Error getting all players:', error);
      throw error;
    }
  }

  // Get available players
  async getAvailablePlayers() {
    try {
      const players = await Player.findAvailable();
      return players;
    } catch (error) {
      console.error('Error getting available players:', error);
      throw error;
    }
  }

  // Get sold players
  async getSoldPlayers() {
    try {
      const players = await Player.findSold();
      return players;
    } catch (error) {
      console.error('Error getting sold players:', error);
      throw error;
    }
  }

  // Get player by ID
  async getPlayerById(id) {
    try {
      const player = await Player.findById(id);
      if (!player) {
        throw new Error('Player not found');
      }
      return player;
    } catch (error) {
      console.error('Error getting player by ID:', error);
      throw error;
    }
  }

  // Create new player
  async createPlayer(playerData) {
    try {
      const { name, skills, basePrice } = playerData;

      // Validate required fields
      if (!name || !skills || !basePrice) {
        throw new Error('Name, skills, and base price are required');
      }

      // Validate skills array
      if (!Array.isArray(skills) || skills.length === 0) {
        throw new Error('Skills must be a non-empty array');
      }

      // Validate base price
      if (basePrice <= 0) {
        throw new Error('Base price must be greater than 0');
      }

      const player = new Player({
        name,
        skills,
        basePrice
      });

      await player.save();
      return player;

    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  }

  // Update player
  async updatePlayer(id, updateData) {
    try {
      const player = await Player.findById(id);
      if (!player) {
        throw new Error('Player not found');
      }

      // Don't allow updating sold players
      if (player.isSold) {
        throw new Error('Cannot update sold player');
      }

      Object.assign(player, updateData);
      await player.save();
      return player;

    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  }

  // Delete player
  async deletePlayer(id) {
    try {
      const player = await Player.findById(id);
      if (!player) {
        throw new Error('Player not found');
      }

      // Don't allow deleting sold players
      if (player.isSold) {
        throw new Error('Cannot delete sold player');
      }

      await Player.findByIdAndDelete(id);
      return { success: true };

    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  }

  // Get players by team
  async getPlayersByTeam(teamId) {
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        throw new Error('Team not found');
      }

      const players = await Player.findByTeam(teamId);
      return players;

    } catch (error) {
      console.error('Error getting players by team:', error);
      throw error;
    }
  }

  // Get player statistics
  async getPlayerStats() {
    try {
      const allPlayers = await Player.find();
      const availablePlayers = await Player.findAvailable();
      const soldPlayers = await Player.findSold();

      const totalValue = soldPlayers.reduce((sum, player) => sum + (player.soldPrice || 0), 0);
      const averagePrice = soldPlayers.length > 0 ? totalValue / soldPlayers.length : 0;

      return {
        totalPlayers: allPlayers.length,
        availablePlayers: availablePlayers.length,
        soldPlayers: soldPlayers.length,
        totalValue: totalValue,
        averagePrice: Math.round(averagePrice)
      };

    } catch (error) {
      console.error('Error getting player stats:', error);
      throw error;
    }
  }

  // Search players
  async searchPlayers(query) {
    try {
      const players = await Player.findAvailable();
      
      if (!query) {
        return players;
      }

      const searchTerm = query.toLowerCase();
      const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm) ||
        player.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );

      return filteredPlayers;

    } catch (error) {
      console.error('Error searching players:', error);
      throw error;
    }
  }
}

module.exports = new PlayerService();
