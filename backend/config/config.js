require('dotenv').config();

const config = {
  // Server configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  database: {
    uri: process.env.MONGODB_URI // MongoDB URI connection string
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'jpl_auction_secret_key_2024',
    expiresIn: '24h'
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  },
  
  // Socket.io configuration
  socket: {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  },
  
  // Auction configuration
  auction: {
    defaultTeamBudget: parseInt(process.env.DEFAULT_TEAM_BUDGET) || 5000000,
    defaultTeamCount: parseInt(process.env.DEFAULT_TEAM_COUNT) || 4,
    minBidIncrement: parseInt(process.env.MIN_BID_INCREMENT) || 10000,
    timeout: parseInt(process.env.AUCTION_TIMEOUT) || 300000
  }
};

module.exports = config;
