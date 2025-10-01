const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');

// Start auction for a player
router.post('/start', auctionController.startAuction);

// Submit a bid
router.post('/bid', auctionController.submitBid);

// Accept current bid
router.post('/accept', auctionController.acceptBid);

// Reject current bid
router.post('/reject', auctionController.rejectBid);

// Get current auction status
router.get('/status', auctionController.getAuctionStatus);

// Get auction history
router.get('/history', auctionController.getAuctionHistory);

// End current auction
router.post('/end', auctionController.endAuction);

module.exports = router;
