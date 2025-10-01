const { connectDB } = require('../config/database');
const Player = require('../models/Player');
const Team = require('../models/Team');
const Auction = require('../models/Auction');
const config = require('../config/config');

// Sample players data
const playersData = [
  { name: 'Virat Kohli', skills: ['Batting'], basePrice: 1000000 },
  { name: 'Jasprit Bumrah', skills: ['Bowling'], basePrice: 800000 },
  { name: 'Rohit Sharma', skills: ['Batting'], basePrice: 900000 },
  { name: 'Ravindra Jadeja', skills: ['Batting', 'Bowling'], basePrice: 750000 },
  { name: 'KL Rahul', skills: ['Batting'], basePrice: 850000 },
  { name: 'Mohammed Shami', skills: ['Bowling'], basePrice: 700000 },
  { name: 'Hardik Pandya', skills: ['Batting', 'Bowling'], basePrice: 800000 },
  { name: 'Rishabh Pant', skills: ['Batting'], basePrice: 650000 },
  { name: 'Yuzvendra Chahal', skills: ['Bowling'], basePrice: 600000 },
  { name: 'Shubman Gill', skills: ['Batting'], basePrice: 700000 }
];

// Sample teams data
const teamsData = [
  { name: 'Team Alpha', budget: config.auction.defaultTeamBudget },
  { name: 'Team Beta', budget: config.auction.defaultTeamBudget },
  { name: 'Team Gamma', budget: config.auction.defaultTeamBudget },
  { name: 'Team Delta', budget: config.auction.defaultTeamBudget }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting MongoDB database seeding...');

    // Clear existing data
    await Auction.deleteMany({});
    await Player.deleteMany({});
    await Team.deleteMany({});

    // Insert teams
    console.log('📝 Inserting teams...');
    const teams = await Team.insertMany(teamsData.map(team => ({
      ...team,
      remainingBudget: team.budget
    })));

    // Insert players
    console.log('📝 Inserting players...');
    const players = await Player.insertMany(playersData);

    console.log('✅ MongoDB database seeded successfully!');
    console.log(`   - ${teams.length} teams created`);
    console.log(`   - ${players.length} players created`);

    return { teams, players };

  } catch (error) {
    console.error('❌ Error seeding MongoDB database:', error);
    throw error;
  }
}

async function checkDatabaseConnection() {
  try {
    const connected = await connectDB();
    if (connected) {
      console.log('✅ MongoDB connection successful');
      return true;
    } else {
      console.log('❌ MongoDB connection failed');
      return false;
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
}

module.exports = {
  seedDatabase,
  checkDatabaseConnection
};
