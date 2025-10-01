const TeamRoster = ({ team }) => {
  return (
    <div className="team-roster">
      <div className="team-header">
        <h3>{team.name}</h3>
        <div className="team-budget">
          Budget: ₹{team.budget.toLocaleString()}
        </div>
      </div>
      
      <div className="team-players">
        <h4>Players ({team.players.length})</h4>
        {team.players.length === 0 ? (
          <p className="no-players">No players yet</p>
        ) : (
          <div className="players-list">
            {team.players.map((player, index) => (
              <div key={index} className="team-player">
                <div className="player-name">{player.name}</div>
                <div className="player-skills">
                  {player.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="player-price">
                  ₹{player.soldPrice.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamRoster
