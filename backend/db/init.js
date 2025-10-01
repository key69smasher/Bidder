const { connectDB } = require('../config/database');
const { seedDatabase, checkDatabaseConnection } = require('./seed');

async function initializeDatabase() {
  try {
    console.log('🗄️  Initializing JPL Auction MongoDB Database...');

    // Check database connection
    const connected = await checkDatabaseConnection();
    if (!connected) {
      throw new Error('MongoDB connection failed');
    }

    console.log('📋 MongoDB schemas will be created automatically by Mongoose');

    // Seed database with initial data
    console.log('🌱 Seeding database with initial data...');
    await seedDatabase();

    console.log('🎉 MongoDB database initialization completed successfully!');

  } catch (error) {
    console.error('❌ MongoDB database initialization failed:', error);
    throw error;
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('✅ MongoDB database initialization completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ MongoDB database initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
