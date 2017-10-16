import React from 'react';
import update from 'immutability-helper';
import './index.scss';

class Matches extends React.Component {
    render() {
      console.log(this.props.matches, 'm');
      return (
        <div className="matchesContainer">
        {this.props.matches.map((match, matchIndex) => {
        return(

          <div key={`$${matchIndex}`} className="expand match">
            <span className="playerName"> {match.playerOne.name} </span>
            <span className="playerScore"> {match.playerOne.score} - {match.playerTwo.score}</span>
            <span className="playerName"> {match.playerTwo.name} </span>
          </div>
        );
        })}
        </div>
      )
    }
  }

export default Matches;
