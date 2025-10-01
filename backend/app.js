const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

// Import configuration
const config = require('./config/config');

// Import services
const auctionService = require('./services/auctionService');

// Import routes
const playerRoutes = require('./routers/playerRoutes');
const teamRoutes = require('./routers/teamRoutes');
const auctionRoutes = require('./routers/auctionRoutes');
const authRoutes = require('./routers/authRoutes');

// Import middleware
const errorHandler = require('./middlewares/errorHandler');

// Import database utilities
const { connectDB } = require('./config/database');
const { checkDatabaseConnection } = require('./db/seed');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: config.socket.cors
});

// Set Socket.io instance in auction service
auctionService.setSocketIO(io);

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'JPL Auction Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/auction', auctionRoutes);
app.use('/api/auth', authRoutes);

// Socket.io connection handling
io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);

  try {
    // Get initial data from database
    const playerService = require('./services/playerService');
    const teamService = require('./services/teamService');
    
    const players = await playerService.getAvailablePlayers();
    const teams = await teamService.getAllTeams();
    const auctionStatus = await auctionService.getAuctionStatus();

    // Send initial data to client
    socket.emit('initialData', {
      players,
      teams,
      auctionState: auctionStatus
    });

  } catch (error) {
    console.error('Error sending initial data:', error);
    socket.emit('error', { message: 'Failed to load initial data' });
  }

  // Handle bid submission
  socket.on('submitBid', async (data) => {
    try {
      const { playerId, teamId, bidAmount } = data;
      await auctionService.submitBid(teamId, bidAmount);
    } catch (error) {
      socket.emit('bidError', { message: error.message });
    }
  });

  // Handle bid acceptance (Auctioneer only)
  socket.on('acceptBid', async (data) => {
    try {
      await auctionService.acceptBid();
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Handle bid rejection (Auctioneer only)
  socket.on('rejectBid', async () => {
    try {
      await auctionService.rejectBid();
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Handle starting auction for a player
  socket.on('startAuction', async (data) => {
    try {
      const { playerId } = data;
      await auctionService.startAuction(playerId);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = config.port;

server.listen(PORT, async () => {
  console.log(`🚀 JPL Auction Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  
  // Connect to MongoDB
  const dbConnected = await connectDB();
  if (dbConnected) {
    console.log('✅ MongoDB connection established');
  } else {
    console.log('⚠️  MongoDB connection failed - please check your database configuration');
  }
  
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📡 Socket.io enabled for real-time communication`);
});
