import React from 'react';
import update from 'immutability-helper';
import './index.scss';

class Matches extends React.Component {

    render() {
      return (
        <div className="matchesContainer">
          {this.props.months.map((month, monthIndex) => {
            return(
              <div key={`${monthIndex}`} className="matches">
                <h3>{month.name}</h3>
                <input className="toggleBox" id="toggle" type="checkbox" />
                <label htmlFor="toggle"></label>
                <div>
                  <input type="text" placeholder="search by name"/>
                </div>
                {month.matches.map((match, matchIndex) => {
                return(
                  <div key={`$${matchIndex}`} className="expand match">
                    <span className="playerName"> {match.p1.name} </span>
                    <span className="playerScore"> {match.p1.score} - {match.p2.score}</span>
                    <span className="playerName"> {match.p2.name} </span>
                  </div>
                );
                })}
              </div>
            );
          })}
        </div>
      )
    }
  }

export default Matches;
