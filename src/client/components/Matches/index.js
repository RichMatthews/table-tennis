import React from 'react';

class Matches extends React.Component {
  playerSearch(player) {
    let filteredArray = [];
    this.props.matches.reverse().map(function(match){
      if(match.playerOne.name.includes(player) || match.playerTwo.name.includes(player)){
        filteredArray.push(match)
      }
    })
    console.log(filteredArray, 'fa');
  }

  render() {
    return (
      <div>
        <h1>Recent Matches</h1>
        <input type="text" placeholder="search for player" ref="player"/>
        <button onClick={() => this.playerSearch(this.refs.player.value)}>Search</button>
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
