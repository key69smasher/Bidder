const AuctioneerPanel = ({ players, auctionState, onStartAuction, onAcceptBid, onRejectBid }) => {
  return (
    <div className="auctioneer-panel">
      <div className="auctioneer-header">
        <h2>Auctioneer Control Panel</h2>
        <p>Control the auction process and manage player sales</p>
      </div>

      <div className="auctioneer-content">
        <div className="available-players">
          <h3>Available Players ({players.length})</h3>
          <div className="players-list">
            {players.map(player => (
              <div key={player.id} className="player-item">
                <div className="player-info">
                  <h4>{player.name}</h4>
                  <div className="player-skills">
                    {player.skills.map(skill => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="base-price">
                    Base: ₹{player.basePrice.toLocaleString()}
                  </div>
                </div>
                <button 
                  onClick={() => onStartAuction(player.id)}
                  className="start-auction-btn"
                  disabled={auctionState.isActive}
                >
                  Start Auction
                </button>
              </div>
            ))}
          </div>
        </div>

        {auctionState.isActive && (
          <div className="active-auction">
            <h3>Active Auction</h3>
            <div className="auction-details">
              <div className="current-player">
                <h4>{auctionState.currentPlayer?.name}</h4>
                <div className="current-bid">
                  Current Bid: ₹{auctionState.currentBid.toLocaleString()}
                </div>
              </div>
              
              <div className="auctioneer-controls">
                <button 
                  onClick={onAcceptBid}
                  className="accept-bid-btn"
                  disabled={auctionState.currentBid === auctionState.currentPlayer?.basePrice}
                >
                  Accept Bid
                </button>
                <button 
                  onClick={onRejectBid}
                  className="reject-bid-btn"
                >
                  Reject Bid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuctioneerPanel
