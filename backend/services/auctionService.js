const Player = require('../models/Player');
const Team = require('../models/Team');
const Auction = require('../models/Auction');
const config = require('../config/config');

class AuctionService {
  constructor() {
    this.currentAuction = null;
    this.io = null; // Will be set by the main app
  }

  // Set Socket.io instance
  setSocketIO(io) {
    this.io = io;
  }

  // Start auction for a player
  async startAuction(playerId) {
    try {
      // Check if there's already an active auction
      const activeAuction = await Auction.findActive();
      if (activeAuction) {
        throw new Error('Another auction is already active');
      }

      // Get player details
      const player = await Player.findById(playerId);
      if (!player) {
        throw new Error('Player not found');
      }

      if (player.isSold) {
        throw new Error('Player is already sold');
      }

      // Create new auction
      this.currentAuction = new Auction({
        playerId: player._id,
        currentBid: player.basePrice,
        currentBidder: null
      });

      await this.currentAuction.save();

      // Emit auction started event
      if (this.io) {
        this.io.emit('auctionStarted', {
          player: player.toObject(),
          basePrice: player.basePrice,
          auctionId: this.currentAuction._id
        });
      }

      return {
        auction: this.currentAuction.toObject(),
        player: player.toObject()
      };

    } catch (error) {
      console.error('Error starting auction:', error);
      throw error;
    }
  }

  // Submit a bid
  async submitBid(teamId, bidAmount) {
    try {
      if (!this.currentAuction) {
        throw new Error('No active auction');
      }

      // Validate bid amount
      if (bidAmount <= this.currentAuction.currentBid) {
        throw new Error('Bid must be higher than current bid');
      }

      // Check minimum bid increment
      const minBid = this.currentAuction.currentBid + config.auction.minBidIncrement;
      if (bidAmount < minBid) {
        throw new Error(`Minimum bid is ₹${minBid.toLocaleString()}`);
      }

      // Get team details
      const team = await Team.findById(teamId);
      if (!team) {
        throw new Error('Team not found');
      }

      // Check team budget
      if (bidAmount > team.remainingBudget) {
        throw new Error('Insufficient team budget');
      }

      // Update auction with new bid
      await this.currentAuction.updateBid(bidAmount, teamId);

      // Emit bid update
      if (this.io) {
        this.io.emit('bidUpdate', {
          auctionId: this.currentAuction._id,
          playerId: this.currentAuction.playerId,
          teamId: teamId,
          teamName: team.name,
          bidAmount: bidAmount,
          timestamp: new Date()
        });
      }

      return {
        auction: this.currentAuction.toObject(),
        team: team.toObject()
      };

    } catch (error) {
      console.error('Error submitting bid:', error);
      throw error;
    }
  }

  // Accept current bid
  async acceptBid() {
    try {
      if (!this.currentAuction) {
        throw new Error('No active auction');
      }

      if (!this.currentAuction.currentBidder) {
        throw new Error('No bid to accept');
      }

      // Get player and team details
      const player = await Player.findById(this.currentAuction.playerId);
      const team = await Team.findById(this.currentAuction.currentBidder);

      if (!player || !team) {
        throw new Error('Player or team not found');
      }

      // Mark player as sold
      await player.markAsSold(team._id, this.currentAuction.currentBid);

      // Deduct team budget
      await team.deductBudget(this.currentAuction.currentBid);

      // End auction
      await this.currentAuction.endAuction();

      // Get updated data
      const availablePlayers = await Player.findAvailable();
      const allTeams = await Team.find();

      // Emit player sold event
      if (this.io) {
        this.io.emit('playerSold', {
          player: player.toObject(),
          team: team.toObject(),
          soldPrice: this.currentAuction.currentBid,
          availablePlayers: availablePlayers,
          teams: allTeams
        });
      }

      // Clear current auction
      this.currentAuction = null;

      return {
        player: player.toObject(),
        team: team.toObject(),
        soldPrice: this.currentAuction.currentBid
      };

    } catch (error) {
      console.error('Error accepting bid:', error);
      throw error;
    }
  }

  // Reject current bid
  async rejectBid() {
    try {
      if (!this.currentAuction) {
        throw new Error('No active auction');
      }

      // Reset bid to base price
      const player = await Player.findById(this.currentAuction.playerId);
      await this.currentAuction.updateBid(player.basePrice, null);

      // Emit bid rejected event
      if (this.io) {
        this.io.emit('bidRejected', {
          message: 'Bid rejected by auctioneer',
          currentBid: player.basePrice
        });
      }

      return {
        auction: this.currentAuction.toObject()
      };

    } catch (error) {
      console.error('Error rejecting bid:', error);
      throw error;
    }
  }

  // Get current auction status
  async getAuctionStatus() {
    try {
      if (!this.currentAuction) {
        return { isActive: false };
      }

      const auctionWithPlayer = await this.currentAuction.getWithPlayer();
      return {
        isActive: true,
        auction: this.currentAuction.toObject(),
        player: auctionWithPlayer
      };

    } catch (error) {
      console.error('Error getting auction status:', error);
      throw error;
    }
  }

  // Get auction history
  async getAuctionHistory() {
    try {
      const history = await Auction.getHistory();
      return history;

    } catch (error) {
      console.error('Error getting auction history:', error);
      throw error;
    }
  }

  // End current auction without selling
  async endAuction() {
    try {
      if (!this.currentAuction) {
        throw new Error('No active auction');
      }

      await this.currentAuction.endAuction();
      this.currentAuction = null;

      if (this.io) {
        this.io.emit('auctionEnded', {
          message: 'Auction ended without sale'
        });
      }

      return { success: true };

    } catch (error) {
      console.error('Error ending auction:', error);
      throw error;
    }
  }
}

module.exports = new AuctionService();
