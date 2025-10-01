// Simple test script to validate backend functionality
const io = require('socket.io-client');

const socket = io('http://localhost:3001');

console.log('Testing JPL Backend Connection...');

socket.on('connect', () => {
  console.log('✅ Connected to server');
  
  // Test initial data
  socket.on('initialData', (data) => {
    console.log('✅ Received initial data:');
    console.log(`   - Players: ${data.players.length}`);
    console.log(`   - Teams: ${data.teams.length}`);
    console.log(`   - Auction Active: ${data.auctionState.isActive}`);
  });
  
  // Test bid submission
  setTimeout(() => {
    console.log('🧪 Testing bid submission...');
    socket.emit('submitBid', {
      playerId: '1',
      teamId: '1',
      bidAmount: 1100000
    });
  }, 1000);
  
  // Test auction start
  setTimeout(() => {
    console.log('🧪 Testing auction start...');
    socket.emit('startAuction', { playerId: '1' });
  }, 2000);
  
  // Test bid acceptance
  setTimeout(() => {
    console.log('🧪 Testing bid acceptance...');
    socket.emit('acceptBid', { playerId: '1' });
  }, 3000);
  
  // Cleanup
  setTimeout(() => {
    console.log('✅ Test completed successfully');
    socket.disconnect();
    process.exit(0);
  }, 4000);
});

socket.on('bidUpdate', (data) => {
  console.log('✅ Bid update received:', data);
});

socket.on('playerSold', (data) => {
  console.log('✅ Player sold:', data.player.name, 'to', data.team.name);
});

socket.on('error', (error) => {
  console.log('❌ Error:', error.message);
});

socket.on('connect_error', (error) => {
  console.log('❌ Connection error:', error.message);
  process.exit(1);
});
