# JPL Auction MongoDB Setup Guide

This guide explains how to set up MongoDB for the JPL Auction system.

## Prerequisites

1. **MongoDB** (version 4.4 or higher)
2. **Node.js** (version 14 or higher)
3. **npm** or **yarn**

## MongoDB Setup Options

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for your OS
   - Start MongoDB service

2. **Verify Installation**
```bash
# Check MongoDB version
mongod --version

# Start MongoDB (if not running as service)
mongod
```

### Option 2: MongoDB with Docker (Recommended)

1. **Install Docker** if not already installed
2. **Run MongoDB container:**
```bash
docker run --name jpl-mongodb \
  -p 27017:27017 \
  -d mongo:latest
```

### Option 3: MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas account**
   - Go to: https://www.mongodb.com/atlas
   - Create free cluster
   - Get connection string

2. **Use connection string in .env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jpl_auction
```

## Environment Configuration

### 1. Create Environment File

Copy the example environment file:
```bash
cp env.example .env
```

### 2. Update Environment Variables

Edit `.env` file with your MongoDB credentials:

```env
# Database Configuration (MongoDB)
DB_HOST=localhost
DB_PORT=27017
DB_NAME=jpl_auction
DB_USER=
DB_PASSWORD=
# Alternative: Use MongoDB URI for cloud databases
# MONGODB_URI=mongodb://username:password@host:port/database

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (for future authentication)
JWT_SECRET=jpl_auction_secret_key_2024

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Socket.io Configuration
SOCKET_CORS_ORIGIN=http://localhost:5173

# Team Budget Configuration
DEFAULT_TEAM_BUDGET=5000000
DEFAULT_TEAM_COUNT=4

# Auction Configuration
MIN_BID_INCREMENT=10000
AUCTION_TIMEOUT=300000
```

## Database Initialization

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
# Create collections and seed data
npm run db:init
```

### 3. Verify Setup
```bash
# Test database connection
npm run test
```

## MongoDB Collections

The system creates the following collections:

### Players Collection
```javascript
{
  _id: ObjectId,
  name: String,
  skills: [String], // ['Batting', 'Bowling']
  basePrice: Number,
  isSold: Boolean,
  soldPrice: Number,
  teamId: ObjectId,
  soldAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Teams Collection
```javascript
{
  _id: ObjectId,
  name: String,
  budget: Number,
  remainingBudget: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Auctions Collection
```javascript
{
  _id: ObjectId,
  playerId: ObjectId,
  currentBid: Number,
  currentBidder: ObjectId,
  isActive: Boolean,
  startTime: Date,
  endTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Sample Data

The system comes preloaded with:

### Players (10 total)
- Virat Kohli (Batting) - ₹10,00,000
- Jasprit Bumrah (Bowling) - ₹8,00,000
- Rohit Sharma (Batting) - ₹9,00,000
- Ravindra Jadeja (Batting, Bowling) - ₹7,50,000
- KL Rahul (Batting) - ₹8,50,000
- Mohammed Shami (Bowling) - ₹7,00,000
- Hardik Pandya (Batting, Bowling) - ₹8,00,000
- Rishabh Pant (Batting) - ₹6,50,000
- Yuzvendra Chahal (Bowling) - ₹6,00,000
- Shubman Gill (Batting) - ₹7,00,000

### Teams (4 total)
- Team Alpha - ₹50,00,000
- Team Beta - ₹50,00,000
- Team Gamma - ₹50,00,000
- Team Delta - ₹50,00,000

## Database Management Commands

### Reset Database
```bash
# Drop and recreate all collections
npm run db:init
```

### Seed Data Only
```bash
# Add sample data to existing collections
npm run db:seed
```

### MongoDB Shell Commands
```bash
# Connect to MongoDB
mongosh

# Use database
use jpl_auction

# View collections
show collections

# View players
db.players.find()

# View teams
db.teams.find()

# View auctions
db.auctions.find()
```

### Backup Database
```bash
# Create backup
mongodump --db jpl_auction --out backup/

# Restore from backup
mongorestore --db jpl_auction backup/jpl_auction/
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if MongoDB is running
   - Verify host and port in .env file
   - Check firewall settings

2. **Authentication Failed**
   - Verify username and password
   - Check user permissions
   - Ensure user has database access

3. **Database Not Found**
   - Create database manually
   - Check database name in .env
   - Verify database exists

4. **Permission Denied**
   - Grant proper permissions to user
   - Check database ownership
   - Verify user roles

### Connection Test

Test MongoDB connection:
```bash
# Using mongosh
mongosh mongodb://localhost:27017/jpl_auction

# Using Node.js
node -e "require('./config/database').connectDB()"
```

## Production Considerations

### Security
- Use strong passwords
- Enable authentication
- Restrict database access
- Use environment variables for secrets

### Performance
- Create appropriate indexes
- Monitor query performance
- Use connection pooling
- Regular database maintenance

### Backup Strategy
- Automated daily backups
- Point-in-time recovery
- Test restore procedures
- Store backups securely

## MongoDB Atlas Setup (Cloud)

1. **Create Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Sign up for free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Configure Access**
   - Add IP address (0.0.0.0/0 for development)
   - Create database user
   - Get connection string

4. **Update Environment**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jpl_auction?retryWrites=true&w=majority
```

## Support

For MongoDB-related issues:
1. Check the logs in console output
2. Verify environment configuration
3. Test database connection manually
4. Review MongoDB documentation

---

**JPL Auction MongoDB Setup** - A comprehensive guide for setting up MongoDB for the NIT Jalandhar Premier League auction system.
