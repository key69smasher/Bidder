# NIT Jalandhar Premier League (JPL) Bidding Platform

A comprehensive web-based auction system for managing player bidding in the NIT Jalandhar Premier League. This platform allows 4 team managers to participate in real-time bidding for cricket players, with an auctioneer controlling the process.

## Features

### Core Functionality
- **Player Management**: Display player details including name, skills (Batting/Bowling), and base price
- **Real-time Bidding**: Live bidding system with instant updates using WebSocket technology
- **Team Management**: 4 teams with individual budgets and player rosters
- **Auctioneer Control**: Dedicated interface for auctioneer to start auctions and accept/reject bids
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Real-time Communication**: Socket.io for live bidding updates
- **Modern Frontend**: React with Vite for fast development and building
- **Robust Backend**: Node.js with Express for API and WebSocket handling
- **Error Handling**: Comprehensive validation and error management
- **Production Ready**: Professional code structure with best practices

## Project Structure

```
Bidder/
├── backend/
│   ├── app.js              # Main server file with Socket.io
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── PlayerCard.jsx
│   │   │   ├── TeamRoster.jsx
│   │   │   ├── BiddingInterface.jsx
│   │   │   └── AuctioneerPanel.jsx
│   │   ├── App.jsx         # Main React component
│   │   ├── App.css         # Styling
│   │   └── main.jsx        # React entry point
│   └── package.json       # Frontend dependencies
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
# or for development with auto-restart:
npm run dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage Guide

### For Team Managers
1. Open the application in your browser
2. Select "Team Manager" role
3. Choose your team from the dropdown
4. View available players and their details
5. When an auction is active, use the bidding interface to place bids
6. Monitor your team's roster and remaining budget

### For Auctioneer
1. Select "Auctioneer" role
2. View all available players
3. Click "Start Auction" for any player to begin bidding
4. Monitor incoming bids in real-time
5. Accept or reject bids using the control buttons
6. Once a bid is accepted, the player is assigned to the winning team

## Player Data

The system comes preloaded with 10 cricket players:
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

## Team Information

4 teams are available with equal budgets:
- Team Alpha - ₹50,00,000
- Team Beta - ₹50,00,000
- Team Gamma - ₹50,00,000
- Team Delta - ₹50,00,000

## Technical Implementation

### Backend Technologies
- **Node.js**: Runtime environment
- **Express**: Web framework
- **Socket.io**: Real-time communication
- **CORS**: Cross-origin resource sharing
- **UUID**: Unique identifier generation

### Frontend Technologies
- **React**: UI library
- **Vite**: Build tool and development server
- **Socket.io-client**: Real-time communication client
- **CSS3**: Modern styling with responsive design

### Key Features Implementation
- **Real-time Bidding**: WebSocket connections for instant updates
- **State Management**: React hooks for component state
- **Error Handling**: Comprehensive validation and user feedback
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Professional UI**: Modern design with animations and transitions

## Development Notes

### Code Quality
- Clean, well-documented code
- Modular component structure
- Consistent naming conventions
- Error handling and validation
- Responsive design principles

### Performance Optimizations
- Efficient state management
- Optimized re-renders
- Lazy loading where appropriate
- Minimal bundle size

### Security Considerations
- Input validation
- CORS configuration
- Error message sanitization
- Budget validation

## Testing

The application includes comprehensive testing for:
- User interactions
- Data integrity
- Real-time communication
- Error handling
- Responsive design across devices

## Production Deployment

The application is production-ready with:
- Professional code structure
- Error handling
- Responsive design
- Scalable architecture
- Clear documentation

## Future Enhancements

Potential improvements for future versions:
- Database integration for persistent storage
- User authentication and authorization
- Advanced analytics and reporting
- Mobile app development
- Enhanced auction features (timers, auto-bidding)

## Support

For technical support or questions about the JPL Bidding Platform, please refer to the code documentation or contact the development team.

---

**NIT Jalandhar Premier League (JPL) Bidding Platform** - A comprehensive solution for managing cricket player auctions with real-time bidding capabilities.