const mongoose = require('mongoose');

// Team Schema
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  remainingBudget: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
// teamSchema.index({ name: 1 }); // Removed - unique constraint already creates index

// Virtual for formatted budget
teamSchema.virtual('formattedBudget').get(function() {
  return `₹${this.budget.toLocaleString()}`;
});

// Virtual for formatted remaining budget
teamSchema.virtual('formattedRemainingBudget').get(function() {
  return `₹${this.remainingBudget.toLocaleString()}`;
});

// Instance methods
teamSchema.methods.deductBudget = function(amount) {
  if (this.remainingBudget < amount) {
    throw new Error('Insufficient budget');
  }
  
  this.remainingBudget -= amount;
  return this.save();
};

teamSchema.methods.addBudget = function(amount) {
  this.remainingBudget += amount;
  return this.save();
};

teamSchema.methods.getPlayers = function() {
  const Player = mongoose.model('Player');
  return Player.find({ teamId: this._id, isSold: true }).sort({ soldAt: -1 });
};

teamSchema.methods.getStats = async function() {
  const players = await this.getPlayers();
  const totalSpent = players.reduce((sum, player) => sum + (player.soldPrice || 0), 0);
  
  return {
    totalPlayers: players.length,
    totalSpent: totalSpent,
    remainingBudget: this.remainingBudget,
    averagePlayerPrice: players.length > 0 ? Math.round(totalSpent / players.length) : 0
  };
};

// Transform JSON output
teamSchema.methods.toJSON = function() {
  const team = this.toObject();
  team.id = team._id;
  delete team._id;
  delete team.__v;
  return team;
};

// Create and export model
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
