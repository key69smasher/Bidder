# 🚀 JPL Auction Platform - Complete API Routes

## 📍 **Base URL**
```
http://localhost:3001
```

---

## 🔐 **Authentication Routes** (`/api/auth`)

### **Team Manager Registration**
```http
POST /api/auth/register
```
**Body:**
```json
{
  "teamName": "Team Alpha",
  "managerName": "John Doe",
  "email": "john@teamalpha.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Team registered successfully",
  "data": {
    "team": { "id": "...", "name": "Team Alpha", "budget": 5000000 },
    "token": "jwt_token_here",
    "user": { "teamId": "...", "role": "manager" }
  }
}
```

### **Team Manager Login**
```http
POST /api/auth/login
```
**Body:**
```json
{
  "teamName": "Team Alpha",
  "password": "password123"
}
```

### **Auctioneer Login**
```http
POST /api/auth/auctioneer/login
```
**Body:**
```json
{
  "username": "auctioneer",
  "password": "admin123"
}
```

### **Verify Token**
```http
GET /api/auth/verify
```
**Headers:**
```
Authorization: Bearer <jwt_token>
```

---

## 👥 **Player Management Routes** (`/api/players`)

### **Add New Player to Auction**
```http
POST /api/players
```
**Body:**
```json
{
  "name": "Virat Kohli",
  "skills": ["Batting"],
  "basePrice": 1000000
}
```

### **Get All Players**
```http
GET /api/players
```

### **Get Available Players (Not Sold)**
```http
GET /api/players/available
```

### **Get Sold Players**
```http
GET /api/players/sold
```

### **Get Player by ID**
```http
GET /api/players/:id
```

### **Update Player**
```http
PUT /api/players/:id
```
**Body:**
```json
{
  "name": "Updated Name",
  "skills": ["Batting", "Bowling"],
  "basePrice": 1200000
}
```

### **Delete Player**
```http
DELETE /api/players/:id
```

### **Search Players**
```http
GET /api/players/search?q=virat
```

### **Get Player Statistics**
```http
GET /api/players/stats
```

### **Get Players by Team**
```http
GET /api/players/team/:teamId
```

---

## 🏆 **Team Management Routes** (`/api/teams`)

### **Create New Team**
```http
POST /api/teams
```
**Body:**
```json
{
  "name": "Team Beta",
  "budget": 5000000
}
```

### **Get All Teams**
```http
GET /api/teams
```

### **Get Team by ID**
```http
GET /api/teams/:id
```

### **Get Team with Players**
```http
GET /api/teams/:id/players
```

### **Get Team Statistics**
```http
GET /api/teams/:id/stats
```

### **Get All Teams with Statistics**
```http
GET /api/teams/stats
```

### **Get Team Leaderboard**
```http
GET /api/teams/leaderboard
```

### **Update Team**
```http
PUT /api/teams/:id
```
**Body:**
```json
{
  "name": "Updated Team Name",
  "budget": 6000000
}
```

### **Delete Team**
```http
DELETE /api/teams/:id
```

### **Transfer Player Between Teams**
```http
POST /api/teams/transfer
```
**Body:**
```json
{
  "playerId": "player_id_here",
  "fromTeamId": "team_id_here",
  "toTeamId": "team_id_here"
}
```

---

## 🎯 **Auction Management Routes** (`/api/auction`)

### **Start Auction for Player**
```http
POST /api/auction/start
```
**Body:**
```json
{
  "playerId": "player_id_here"
}
```

### **Submit Bid**
```http
POST /api/auction/bid
```
**Body:**
```json
{
  "teamId": "team_id_here",
  "bidAmount": 1100000
}
```

### **Accept Current Bid (Auctioneer Only)**
```http
POST /api/auction/accept
```

### **Reject Current Bid (Auctioneer Only)**
```http
POST /api/auction/reject
```

### **Get Current Auction Status**
```http
GET /api/auction/status
```

### **Get Auction History**
```http
GET /api/auction/history
```

### **End Current Auction**
```http
POST /api/auction/end
```

---

## 🔌 **Socket.io Events**

### **Client to Server Events:**
- `submitBid` - Submit a bid
- `startAuction` - Start auction for player
- `acceptBid` - Accept current bid
- `rejectBid` - Reject current bid

### **Server to Client Events:**
- `initialData` - Initial app data
- `bidUpdate` - Bid update notification
- `playerSold` - Player sold notification
- `auctionStarted` - Auction started
- `bidRejected` - Bid rejected
- `error` - Error messages

---

## 📝 **Example Usage**

### **1. Register a Team Manager:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "teamName": "Team Alpha",
    "managerName": "John Doe",
    "email": "john@teamalpha.com",
    "password": "password123"
  }'
```

### **2. Add a Player:**
```bash
curl -X POST http://localhost:3001/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Virat Kohli",
    "skills": ["Batting"],
    "basePrice": 1000000
  }'
```

### **3. Start Auction:**
```bash
curl -X POST http://localhost:3001/api/auction/start \
  -H "Content-Type: application/json" \
  -d '{
    "playerId": "player_id_here"
  }'
```

### **4. Submit Bid:**
```bash
curl -X POST http://localhost:3001/api/auction/bid \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_id_here",
    "bidAmount": 1100000
  }'
```

---

## 🔑 **Authentication Headers**

For protected routes, include the JWT token:
```http
Authorization: Bearer <your_jwt_token>
```

---

## 📊 **Response Format**

All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Description of result",
  "data": { /* Response data */ }
}
```

---

## 🚀 **Quick Start Commands**

**Start Backend:**
```bash
cd backend
npm start
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Access Application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

**🎉 All routes are now available for the JPL Auction Platform!**



