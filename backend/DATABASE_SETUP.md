# JPL Auction Database Setup Guide

This guide explains how to set up the PostgreSQL database for the JPL Auction system.

## Prerequisites

1. **PostgreSQL** (version 12 or higher)
2. **Node.js** (version 14 or higher)
3. **npm** or **yarn**

## Database Setup Options

### Option 1: Using Docker (Recommended)

1. **Install Docker** if not already installed
2. **Run PostgreSQL container:**
```bash
docker run --name jpl-postgres \
  -e POSTGRES_DB=jpl_auction \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password123 \
  -p 5432:5432 \
  -d postgres:15
```

### Option 2: Local PostgreSQL Installation

1. **Install PostgreSQL** on your system
2. **Create database:**
```sql
CREATE DATABASE jpl_auction;
CREATE USER jpl_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE jpl_auction TO jpl_user;
```

### Option 3: Cloud Database (Production)

Use services like:
- **AWS RDS**
- **Google Cloud SQL**
- **Azure Database for PostgreSQL**
- **Heroku Postgres**

## Environment Configuration

### 1. Create Environment File

Copy the example environment file:
```bash
cp env.example .env
```

### 2. Update Environment Variables

Edit `.env` file with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jpl_auction
DB_USER=postgres
DB_PASSWORD=password123

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
# Create tables and seed data
npm run db:init
```

### 3. Verify Setup
```bash
# Test database connection
npm run test
```

## Database Schema

The system creates the following tables:

### Players Table
- `id` - Primary key
- `name` - Player name
- `skills` - JSON array of skills (Batting, Bowling)
- `base_price` - Starting bid price
- `is_sold` - Boolean flag
- `sold_price` - Final sale price
- `team_id` - Foreign key to teams
- `sold_at` - Timestamp of sale
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Teams Table
- `id` - Primary key
- `name` - Team name (unique)
- `budget` - Total team budget
- `remaining_budget` - Available budget
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Auctions Table
- `id` - Primary key
- `player_id` - Foreign key to players
- `current_bid` - Current highest bid
- `current_bidder` - Foreign key to teams
- `is_active` - Boolean flag
- `start_time` - Auction start timestamp
- `end_time` - Auction end timestamp
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Bids Table
- `id` - Primary key
- `auction_id` - Foreign key to auctions
- `team_id` - Foreign key to teams
- `bid_amount` - Bid amount
- `bid_time` - Bid timestamp

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
# Drop and recreate all tables
npm run db:init
```

### Seed Data Only
```bash
# Add sample data to existing tables
npm run db:seed
```

### Backup Database
```bash
# Create backup (PostgreSQL)
pg_dump -h localhost -U postgres jpl_auction > backup.sql
```

### Restore Database
```bash
# Restore from backup
psql -h localhost -U postgres jpl_auction < backup.sql
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Check if PostgreSQL is running
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

Test database connection:
```bash
# Using psql
psql -h localhost -U postgres -d jpl_auction

# Using Node.js
node -e "require('./config/database').query('SELECT NOW()')"
```

## Production Considerations

### Security
- Use strong passwords
- Enable SSL connections
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

## Support

For database-related issues:
1. Check the logs in console output
2. Verify environment configuration
3. Test database connection manually
4. Review PostgreSQL documentation

---

**JPL Auction Database Setup** - A comprehensive guide for setting up the PostgreSQL database for the NIT Jalandhar Premier League auction system.
