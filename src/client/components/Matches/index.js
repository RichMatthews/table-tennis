import React from 'react';
import './index.scss';

class Matches extends React.Component {
  render() {
    return (
      <div>
        <h1>Recent Matches</h1>
        <div className="matches">
          {this.props.matches.map(function(match, index){
            return <div key={index} className="match"><span className="playerName">{match.playerOne.name}</span><span className="playerScore">{match.playerOne.score} </span>
            <span className="playerScore"> {match.playerTwo.score} </span> <span className="playerName"> {match.playerTwo.name}</span>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Matches;
