const mongoose = require('mongoose');

// MongoDB connection options
const connectionOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    
    // Validate MongoDB URI format
    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
    }
    
    console.log('🔗 Connecting to MongoDB...');
    console.log(`📡 URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials in logs
    
    await mongoose.connect(mongoUri, connectionOptions);
    
    console.log('✅ Connected to MongoDB database');
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('EBADNAME')) {
      console.error('💡 Tip: Check your MongoDB URI format. It should be:');
      console.error('   - Local: mongodb://localhost:27017/database_name');
      console.error('   - Atlas: mongodb+srv://username:password@cluster.mongodb.net/database_name');
    }
    
    return false;
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = {
  connectDB,
  mongoose
};
