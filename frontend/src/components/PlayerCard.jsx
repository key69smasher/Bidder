import { useState } from 'react'

const PlayerCard = ({ player, onBid, currentBid, isActive }) => {
  const [bidAmount, setBidAmount] = useState('')

  const handleBid = (e) => {
    e.preventDefault()
    if (bidAmount && parseInt(bidAmount) > currentBid) {
      onBid(player.id, bidAmount)
      setBidAmount('')
    }
  }

  const getSkillColor = (skill) => {
    switch (skill) {
      case 'Batting':
        return '#4CAF50'
      case 'Bowling':
        return '#2196F3'
      default:
        return '#FF9800'
    }
  }

  return (
    <div className={`player-card ${isActive ? 'active' : ''}`}>
      <div className="player-header">
        <h3>{player.name}</h3>
        <div className="player-skills">
          {player.skills.map(skill => (
            <span 
              key={skill} 
              className="skill-badge"
              style={{ backgroundColor: getSkillColor(skill) }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="player-details">
        <div className="base-price">
          Base Price: ₹{player.basePrice.toLocaleString()}
        </div>
        
        {isActive && (
          <div className="current-bid">
            Current Bid: ₹{currentBid.toLocaleString()}
          </div>
        )}
      </div>

      {isActive && (
        <form onSubmit={handleBid} className="bid-form">
          <div className="bid-input-group">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min: ₹${(currentBid + 10000).toLocaleString()}`}
              min={currentBid + 10000}
              step="10000"
            />
            <button 
              type="submit" 
              disabled={!bidAmount || parseInt(bidAmount) <= currentBid}
              className="bid-button"
            >
              Bid
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PlayerCard
