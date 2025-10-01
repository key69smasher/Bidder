const mongoose = require('mongoose');

// Player Schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  skills: [{
    type: String,
    enum: ['Batting', 'Bowling'],
    required: true
  }],
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  isSold: {
    type: Boolean,
    default: false
  },
  soldPrice: {
    type: Number,
    default: null
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null
  },
  soldAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better performance
playerSchema.index({ isSold: 1 });
playerSchema.index({ teamId: 1 });
playerSchema.index({ name: 'text' });

// Virtual for formatted base price
playerSchema.virtual('formattedBasePrice').get(function() {
  return `₹${this.basePrice.toLocaleString()}`;
});

// Virtual for formatted sold price
playerSchema.virtual('formattedSoldPrice').get(function() {
  return this.soldPrice ? `₹${this.soldPrice.toLocaleString()}` : null;
});

// Static methods
playerSchema.statics.findAvailable = function() {
  return this.find({ isSold: false }).sort({ createdAt: 1 });
};

playerSchema.statics.findSold = function() {
  return this.find({ isSold: true }).sort({ soldAt: -1 });
};

playerSchema.statics.findByTeam = function(teamId) {
  return this.find({ teamId: teamId, isSold: true }).sort({ soldAt: -1 });
};

// Instance methods
playerSchema.methods.markAsSold = function(teamId, soldPrice) {
  this.isSold = true;
  this.soldPrice = soldPrice;
  this.teamId = teamId;
  this.soldAt = new Date();
  return this.save();
};

// Transform JSON output
playerSchema.methods.toJSON = function() {
  const player = this.toObject();
  player.id = player._id;
  delete player._id;
  delete player.__v;
  return player;
};

// Create and export model
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
