import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
import PlayerCard from './components/PlayerCard'
import TeamRoster from './components/TeamRoster'
import BiddingInterface from './components/BiddingInterface'
import AuctioneerPanel from './components/AuctioneerPanel'

const socket = io('http://localhost:3001')

function App() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [auctionState, setAuctionState] = useState({
    currentPlayer: null,
    currentBid: 0,
    currentBidder: null,
    isActive: false
  })
  const [userRole, setUserRole] = useState('manager') // 'manager' or 'auctioneer'
  const [selectedTeam, setSelectedTeam] = useState('1')

  useEffect(() => {
    // Listen for initial data
    socket.on('initialData', (data) => {
      setPlayers(data.players)
      setTeams(data.teams)
      setAuctionState(data.auctionState)
    })

    // Listen for bid updates
    socket.on('bidUpdate', (data) => {
      setAuctionState(prev => ({
        ...prev,
        currentBid: data.bidAmount,
        currentBidder: data.teamId
      }))
    })

    // Listen for player sold
    socket.on('playerSold', (data) => {
      setPlayers(data.availablePlayers)
      setTeams(data.teams)
      setAuctionState(prev => ({
        ...prev,
        currentPlayer: null,
        currentBid: 0,
        currentBidder: null,
        isActive: false
      }))
    })

    // Listen for auction started
    socket.on('auctionStarted', (data) => {
      setAuctionState(prev => ({
        ...prev,
        currentPlayer: data.player,
        currentBid: data.basePrice,
        isActive: true
      }))
    })

    // Listen for bid rejected
    socket.on('bidRejected', () => {
      setAuctionState(prev => ({
        ...prev,
        currentBid: 0,
        currentBidder: null
      }))
    })

    // Listen for errors
    socket.on('bidError', (error) => {
      alert(error.message)
    })

    socket.on('error', (error) => {
      alert(error.message)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleBid = (playerId, bidAmount) => {
    socket.emit('submitBid', {
      playerId,
      teamId: selectedTeam,
      bidAmount: parseInt(bidAmount)
    })
  }

  const handleStartAuction = (playerId) => {
    socket.emit('startAuction', { playerId })
  }

  const handleAcceptBid = () => {
    if (auctionState.currentPlayer) {
      socket.emit('acceptBid', { playerId: auctionState.currentPlayer.id })
    }
  }

  const handleRejectBid = () => {
    socket.emit('rejectBid')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>NIT Jalandhar Premier League (JPL)</h1>
        <div className="role-selector">
          <button 
            className={userRole === 'manager' ? 'active' : ''}
            onClick={() => setUserRole('manager')}
          >
            Team Manager
          </button>
          <button 
            className={userRole === 'auctioneer' ? 'active' : ''}
            onClick={() => setUserRole('auctioneer')}
          >
            Auctioneer
          </button>
        </div>
      </header>

      <main className="app-main">
        {userRole === 'manager' && (
          <div className="manager-interface">
            <div className="team-selector">
              <label>Select Team:</label>
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} (₹{team.budget.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="content-grid">
              <div className="players-section">
                <h2>Available Players</h2>
                <div className="players-grid">
                  {players.map(player => (
                    <PlayerCard 
                      key={player.id} 
                      player={player}
                      onBid={handleBid}
                      currentBid={auctionState.currentBid}
                      isActive={auctionState.isActive && auctionState.currentPlayer?.id === player.id}
                    />
                  ))}
                </div>
              </div>

              <div className="teams-section">
                <h2>Team Rosters</h2>
                <div className="teams-grid">
                  {teams.map(team => (
                    <TeamRoster key={team.id} team={team} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {userRole === 'auctioneer' && (
          <div className="auctioneer-interface">
            <AuctioneerPanel 
              players={players}
              auctionState={auctionState}
              onStartAuction={handleStartAuction}
              onAcceptBid={handleAcceptBid}
              onRejectBid={handleRejectBid}
            />
          </div>
        )}

        {auctionState.isActive && (
          <BiddingInterface 
            auctionState={auctionState}
            teams={teams}
            onBid={handleBid}
            selectedTeam={selectedTeam}
            onSelectTeam={setSelectedTeam}
          />
        )}
      </main>
    </div>
  )
}

export default App
