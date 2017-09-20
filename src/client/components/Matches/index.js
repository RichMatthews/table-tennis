import React from 'react';

class Matches extends React.Component {
  render() {
    return (
      <div>
        <h1>Recent Matches</h1>
        {this.props.matches.map(function(match, index){
          return <div key={index}><span>{match.playerOne.name} {match.playerOne.score} </span>
          :<span> {match.playerTwo.score} {match.playerTwo.name}</span>
          <span> {match.date} </span>
          </div>
        })}
      </div>
    )
  }
}

export default Matches;
