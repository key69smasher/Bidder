# JPL Auction Platform - Project Structure

## 📁 Complete Project Structure

```
Bidder/
├── backend/                          # Backend Server (Node.js + Express + PostgreSQL)
│   ├── controllers/                  # MVC Controllers
│   │   ├── auctionController.js     # Auction management
│   │   ├── playerController.js      # Player management
│   │   └── teamController.js         # Team management
│   ├── services/                     # Business Logic Layer
│   │   ├── auctionService.js        # Auction business logic
│   │   ├── playerService.js         # Player business logic
│   │   └── teamService.js           # Team business logic
│   ├── models/                       # Database Models
│   │   ├── Player.js                # Player model
│   │   ├── Team.js                  # Team model
│   │   └── Auction.js                # Auction model
│   ├── routers/                      # API Routes
│   │   ├── auctionRoutes.js         # Auction endpoints
│   │   ├── playerRoutes.js          # Player endpoints
│   │   └── teamRoutes.js            # Team endpoints
│   ├── middlewares/                 # Custom Middleware
│   │   ├── auth.js                  # Authentication
│   │   ├── validation.js             # Request validation
│   │   └── errorHandler.js          # Error handling
│   ├── db/                          # Database Layer
│   │   ├── schema.sql               # Database schema
│   │   ├── seed.js                  # Sample data
│   │   └── init.js                  # Database initialization
│   ├── config/                      # Configuration
│   │   ├── config.js                # App configuration
│   │   └── database.js              # Database connection
│   ├── app.js                       # Main application file
│   ├── package.json                 # Dependencies
│   ├── env.example                  # Environment template
│   ├── DATABASE_SETUP.md            # Database setup guide
│   └── test.js                      # Test script
├── frontend/                        # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/              # React Components
│   │   │   ├── PlayerCard.jsx       # Player display
│   │   │   ├── TeamRoster.jsx       # Team roster
│   │   │   ├── BiddingInterface.jsx # Live bidding
│   │   │   └── AuctioneerPanel.jsx  # Auctioneer controls
│   │   ├── App.jsx                  # Main React component
│   │   ├── App.css                   # Styling
│   │   └── main.jsx                  # React entry point
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite configuration
├── start-all.bat                    # Start both servers (Windows)
├── start-backend.bat                # Start backend only
├── start-frontend.bat               # Start frontend only
└── README.md                        # Project documentation
```

## 🏗️ Architecture Overview

### Backend Architecture (MVC Pattern)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │    │    Services     │    │     Models      │
│                 │    │                 │    │                 │
│ • auctionCtrl   │◄──►│ • auctionSvc    │◄──►│ • Player        │
│ • playerCtrl    │    │ • playerSvc     │    │ • Team          │
│ • teamCtrl      │    │ • teamSvc        │    │ • Auction       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Routes      │    │   Middleware    │    │   Database      │
│                 │    │                 │    │                 │
│ • /api/auction  │    │ • auth          │    │ • PostgreSQL    │
│ • /api/players  │    │ • validation    │    │ • Connection    │
│ • /api/teams    │    │ • errorHandler  │    │ • Pool          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend Architecture (Component-Based)

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                             │
│                    (Main Container)                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌─────────┐ ┌─────────────┐ ┌─────────────┐
│PlayerCard│ │BiddingIntf  │ │AuctioneerPnl│
│         │ │             │ │             │
│• Display│ │• Live Bids  │ │• Controls   │
│• Skills │ │• Team Select│ │• Start/End  │
│• Bidding│ │• Bid Input  │ │• Accept/Rej │
└─────────┘ └─────────────┘ └─────────────┘
    │             │             │
    ▼             ▼             ▼
┌─────────┐ ┌─────────────┐ ┌─────────────┐
│TeamRoster│ │Socket.io    │ │Real-time    │
│         │ │Client       │ │Updates      │
│• Players│ │             │ │             │
│• Budget │ │• Events     │ │• Bid Updates│
│• Stats  │ │• Handlers   │ │• Player Sold│
└─────────┘ └─────────────┘ └─────────────┘
```

## 🗄️ Database Schema

### Core Tables

1. **Players Table**
   - Stores player information
   - Skills as JSON array
   - Base price and sale details

2. **Teams Table**
   - Team information
   - Budget tracking
   - Remaining budget calculation

3. **Auctions Table**
   - Active auction state
   - Current bid tracking
   - Auction lifecycle

4. **Bids Table**
   - Bid history
   - Audit trail
   - Analytics data

## 🔧 Environment Configuration

### Required Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jpl_auction
DB_USER=postgres
DB_PASSWORD=your_password

# Server Configuration
PORT=3001
NODE_ENV=development

# Security
JWT_SECRET=your_jwt_secret_key

# CORS
CORS_ORIGIN=http://localhost:5173
SOCKET_CORS_ORIGIN=http://localhost:5173

# Auction Settings
DEFAULT_TEAM_BUDGET=5000000
DEFAULT_TEAM_COUNT=4
MIN_BID_INCREMENT=10000
AUCTION_TIMEOUT=300000
```

## 🚀 Quick Start Commands

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your database credentials
npm run db:init
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Full Stack
```bash
# Windows
start-all.bat

# Manual
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend  
cd frontend && npm run dev
```

## 📊 API Endpoints

### Players API
- `GET /api/players` - Get all players
- `GET /api/players/available` - Get available players
- `GET /api/players/sold` - Get sold players
- `GET /api/players/:id` - Get player by ID
- `POST /api/players` - Create player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player

### Teams API
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `GET /api/teams/:id/players` - Get team players
- `GET /api/teams/stats` - Get team statistics
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team

### Auction API
- `POST /api/auction/start` - Start auction
- `POST /api/auction/bid` - Submit bid
- `POST /api/auction/accept` - Accept bid
- `POST /api/auction/reject` - Reject bid
- `GET /api/auction/status` - Get auction status
- `GET /api/auction/history` - Get auction history

## 🔌 Socket.io Events

### Client to Server
- `submitBid` - Submit a bid
- `startAuction` - Start auction for player
- `acceptBid` - Accept current bid
- `rejectBid` - Reject current bid

### Server to Client
- `initialData` - Initial app data
- `bidUpdate` - Bid update notification
- `playerSold` - Player sold notification
- `auctionStarted` - Auction started
- `bidRejected` - Bid rejected
- `error` - Error messages

## 🛡️ Security Features

- Input validation middleware
- SQL injection prevention
- CORS configuration
- Error handling
- Authentication ready (JWT)
- Role-based access control

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interface
- Adaptive layouts

## 🧪 Testing

- Database connection tests
- API endpoint validation
- Socket.io event testing
- Error handling verification
- Performance monitoring

---

**JPL Auction Platform** - A production-ready, scalable auction system with modern architecture and comprehensive features.
