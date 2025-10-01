#!/usr/bin/env node

// MongoDB URI Test Script
console.log('🔍 MongoDB URI Configuration Test\n');

// Check if MONGODB_URI is set
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.log('❌ MONGODB_URI environment variable is not set');
  console.log('\n📝 To set it, run one of these commands:');
  console.log('\nFor Windows PowerShell:');
  console.log('$env:MONGODB_URI="mongodb://localhost:27017/jpl_auction"');
  console.log('\nFor Windows Command Prompt:');
  console.log('set MONGODB_URI=mongodb://localhost:27017/jpl_auction');
  console.log('\nFor Linux/Mac:');
  console.log('export MONGODB_URI=mongodb://localhost:27017/jpl_auction');
  console.log('\nOr create a .env file in the backend directory with:');
  console.log('MONGODB_URI=mongodb://localhost:27017/jpl_auction');
  process.exit(1);
}

console.log('✅ MONGODB_URI is set');
console.log(`📡 URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);

// Validate URI format
if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
  console.log('❌ Invalid MongoDB URI format');
  console.log('💡 Must start with mongodb:// or mongodb+srv://');
  process.exit(1);
}

console.log('✅ MongoDB URI format is valid');

// Test connection
const mongoose = require('mongoose');

const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

console.log('\n🔗 Testing MongoDB connection...');

mongoose.connect(mongoUri, connectionOptions)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    console.log('🎉 Your MongoDB URI is working correctly');
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ Failed to connect to MongoDB');
    console.log('Error:', error.message);
    
    if (error.message.includes('EBADNAME')) {
      console.log('\n💡 Common fixes for EBADNAME error:');
      console.log('1. Check if your MongoDB URI is complete');
      console.log('2. For MongoDB Atlas, ensure the cluster is running');
      console.log('3. Check network access and IP whitelist');
      console.log('4. Verify username and password are correct');
    }
    
    process.exit(1);
  });

