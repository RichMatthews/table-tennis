import React from 'react';

import './index.scss';

class Table extends React.Component {
  render() {
    return(
      <div>
      <div>
        <h1> Table </h1>
        <table>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        {this.props.players.sort(function(a, b) {
              return (a.rank) - (b.rank);
          }).map(function(player, index) {
          index +=1;
          return <tr key={index} className="lol">
                   <th>{player.rank}</th>
                   <th>{player.name}</th>
                   <th>{player.played}</th>
                   <th>{player.wins}</th>
                   <th>{player.losses}</th>
                 </tr>
        }, this)}
         </table>
      </div>
    </div>
    )
  }
}

export default Table;
