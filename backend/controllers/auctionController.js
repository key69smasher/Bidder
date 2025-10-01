const auctionService = require('../services/auctionService');

class AuctionController {
  // Start auction for a player
  async startAuction(req, res) {
    try {
      const { playerId } = req.body;

      if (!playerId) {
        return res.status(400).json({
          success: false,
          message: 'Player ID is required'
        });
      }

      const result = await auctionService.startAuction(playerId);

      res.status(200).json({
        success: true,
        message: 'Auction started successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in startAuction controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Submit a bid
  async submitBid(req, res) {
    try {
      const { teamId, bidAmount } = req.body;

      if (!teamId || !bidAmount) {
        return res.status(400).json({
          success: false,
          message: 'Team ID and bid amount are required'
        });
      }

      if (bidAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Bid amount must be greater than 0'
        });
      }

      const result = await auctionService.submitBid(teamId, bidAmount);

      res.status(200).json({
        success: true,
        message: 'Bid submitted successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in submitBid controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Accept current bid
  async acceptBid(req, res) {
    try {
      const result = await auctionService.acceptBid();

      res.status(200).json({
        success: true,
        message: 'Bid accepted successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in acceptBid controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Reject current bid
  async rejectBid(req, res) {
    try {
      const result = await auctionService.rejectBid();

      res.status(200).json({
        success: true,
        message: 'Bid rejected successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in rejectBid controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get current auction status
  async getAuctionStatus(req, res) {
    try {
      const result = await auctionService.getAuctionStatus();

      res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {
      console.error('Error in getAuctionStatus controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get auction history
  async getAuctionHistory(req, res) {
    try {
      const result = await auctionService.getAuctionHistory();

      res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {
      console.error('Error in getAuctionHistory controller:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // End current auction
  async endAuction(req, res) {
    try {
      const result = await auctionService.endAuction();

      res.status(200).json({
        success: true,
        message: 'Auction ended successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in endAuction controller:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AuctionController();
