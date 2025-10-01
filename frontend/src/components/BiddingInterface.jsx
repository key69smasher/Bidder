import { useState } from 'react'

const BiddingInterface = ({ auctionState, teams, onBid, selectedTeam, onSelectTeam }) => {
  const [bidAmount, setBidAmount] = useState('')

  const handleBid = (e) => {
    e.preventDefault()
    if (bidAmount && parseInt(bidAmount) > auctionState.currentBid) {
      onBid(auctionState.currentPlayer.id, bidAmount)
      setBidAmount('')
    }
  }

  const currentBidderTeam = teams.find(team => team.id === auctionState.currentBidder)

  return (
    <div className="bidding-interface">
      <div className="bidding-header">
        <h2>Live Auction</h2>
        <div className="current-player">
          <h3>{auctionState.currentPlayer?.name}</h3>
          <div className="player-skills">
            {auctionState.currentPlayer?.skills.map(skill => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bidding-info">
        <div className="current-bid-info">
          <div className="bid-amount">
            Current Bid: ₹{auctionState.currentBid.toLocaleString()}
          </div>
          {currentBidderTeam && (
            <div className="current-bidder">
              Leading: {currentBidderTeam.name}
            </div>
          )}
        </div>

        <form onSubmit={handleBid} className="bid-form">
          <div className="team-selector">
            <label>Your Team:</label>
            <select 
              value={selectedTeam} 
              onChange={(e) => onSelectTeam(e.target.value)}
            >
              {teams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name} (₹{team.budget.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          <div className="bid-input-group">
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min: ₹${(auctionState.currentBid + 10000).toLocaleString()}`}
              min={auctionState.currentBid + 10000}
              step="10000"
            />
            <button 
              type="submit" 
              disabled={!bidAmount || parseInt(bidAmount) <= auctionState.currentBid}
              className="bid-button"
            >
              Place Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BiddingInterface
