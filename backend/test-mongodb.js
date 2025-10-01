// Test MongoDB connection and basic operations
const { connectDB } = require('./config/database');
const Player = require('./models/Player');
const Team = require('./models/Team');

async function testMongoDB() {
  try {
    console.log('🧪 Testing MongoDB Connection...');
    
    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      throw new Error('Failed to connect to MongoDB');
    }
    
    console.log('✅ MongoDB connection successful');
    
    // Test Player model
    console.log('🧪 Testing Player model...');
    const players = await Player.find();
    console.log(`   - Found ${players.length} players`);
    
    // Test Team model
    console.log('🧪 Testing Team model...');
    const teams = await Team.find();
    console.log(`   - Found ${teams.length} teams`);
    
    // Test available players
    const availablePlayers = await Player.findAvailable();
    console.log(`   - Found ${availablePlayers.length} available players`);
    
    // Test sold players
    const soldPlayers = await Player.findSold();
    console.log(`   - Found ${soldPlayers.length} sold players`);
    
    console.log('✅ All MongoDB tests passed!');
    console.log('🎉 MongoDB is ready for the JPL Auction system');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your .env file configuration');
    console.log('3. Verify MongoDB connection string');
    console.log('4. Run: npm run db:init to initialize database');
    
    process.exit(1);
  }
}

// Run test
testMongoDB();
