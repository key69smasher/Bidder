const mongoose = require('mongoose');

// Auction Schema
const auctionSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  currentBid: {
    type: Number,
    required: true,
    min: 0
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better performance
auctionSchema.index({ isActive: 1 });
auctionSchema.index({ playerId: 1 });
auctionSchema.index({ currentBidder: 1 });

// Virtual for formatted current bid
auctionSchema.virtual('formattedCurrentBid').get(function() {
  return `₹${this.currentBid.toLocaleString()}`;
});

// Static methods
auctionSchema.statics.findActive = function() {
  return this.findOne({ isActive: true }).sort({ startTime: -1 });
};

// Instance methods
auctionSchema.methods.updateBid = function(bidAmount, bidderId) {
  this.currentBid = bidAmount;
  this.currentBidder = bidderId;
  return this.save();
};

auctionSchema.methods.endAuction = function() {
  this.isActive = false;
  this.endTime = new Date();
  return this.save();
};

auctionSchema.methods.getWithPlayer = function() {
  return this.populate('playerId', 'name skills basePrice')
    .populate('currentBidder', 'name');
};

// Static method to get auction history
auctionSchema.statics.getHistory = function() {
  return this.find()
    .populate('playerId', 'name skills basePrice')
    .populate('currentBidder', 'name')
    .sort({ createdAt: -1 });
};

// Transform JSON output
auctionSchema.methods.toJSON = function() {
  const auction = this.toObject();
  auction.id = auction._id;
  delete auction._id;
  delete auction.__v;
  return auction;
};

// Create and export model
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
