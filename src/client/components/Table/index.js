import React from 'react';

import './index.scss';

class Table extends React.Component {
  render() {
    return(
      <div className="tableContainer">
        <h1> Table </h1>
        <table>
          <tbody>
            <tr>
              <th className="headings">Rank</th>
              <th className="headings">Name</th>
              <th className="headings">Played</th>
              <th className="headings">Wins</th>
              <th className="headings">Losses</th>
            </tr>
          {this.props.players.sort(function(a, b) {
                return (a.rank) - (b.rank);
            }).map(function(player, index) {
            index +=1;
            return <tr key={index} className="row-one">
                     <th className="stats">{player.rank}</th>
                     <th className="stats">{player.name}</th>
                     <th className="stats">{player.played}</th>
                     <th className="stats">{player.wins}</th>
                     <th className="stats">{player.losses}</th>
                   </tr>
          }, this)}
          </tbody>
         </table>
      </div>
    )
  }
}

export default Table;
