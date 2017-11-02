import React from 'react';

import { Table } from 'semantic-ui-react';
import './index.scss';

class TableComponent extends React.Component {
  render() {
    return(
      <div className="tableContainer">
        <h1> Table </h1>
        <table className="ui striped table">
          <thead>
            <tr>
              <th className="headings">Ranks</th>
              <th className="headings">Name</th>
              <th className="headings">P</th>
              <th className="headings">W</th>
              <th className="headings">L</th>
            </tr>
          </thead>
          <tbody>
          {this.props.players.sort(function(a, b) {
                return (a.rank) - (b.rank);
            }).map(function(player, index) {
            index +=1;
            return <tr key={index} className="table-rows">
                     <td className="stats">{player.rank}</td>
                     <td className="stats">{player.name}</td>
                     <td className="stats">{player.played}</td>
                     <td className="stats">{player.wins}</td>
                     <td className="stats">{player.losses}</td>
                   </tr>
          }, this)}
          </tbody>
         </table>
      </div>
    )
  }
}

export default TableComponent;
