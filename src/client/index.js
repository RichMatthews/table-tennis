import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { rootRef, firebaseInit } from './firebase/config.js';

import './index.scss';

class App extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     players: []
   }
 }

 componentDidMount = () => {
   this.startCode()
 }

 startCode = () => {
   this.pullPlayersFromFirebase('/players' + '/players').then((players) => {
     let allPlayers = Object.keys(players.val()).map(function(key) {
      return players.val()[key];
    })
    this.setState({players: allPlayers});
  })
 }

 pullPlayersFromFirebase = (query) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref(query).on('value', resolve);
  });
}

 submit = (player1, player2) => {
   let players = this.state.players;
   let playerOne = players.filter(function(player){
     return player.name == player1.name;
   });
   let playerTwo = players.filter(function(player){
     return player.name == player2.name;
   });
   playerOne[0].score = player1.score;
   playerTwo[0].score = player2.score;
  if(playerOne[0].score > playerTwo[0].score){
    if (playerOne[0].rank < playerTwo[0].rank){
      console.log('nothing changes');
    }
    else {
      var tempRank = playerOne[0].rank;
      playerOne[0].rank = playerTwo[0].rank;
      playerTwo[0].rank = tempRank;
    }
  }
  else if(playerTwo[0].score > playerOne[0].score){
    if (playerTwo[0].rank < playerOne[0].rank){
      console.log('nothing changes!!!');
    }
    else {
      var tempRank = playerTwo[0].rank;
      playerTwo[0].rank = playerOne[0].rank;
      playerOne[0].rank = tempRank;
    }
  }
  else {
    console.log('error');
  }
  delete playerOne[0]["score"];
  delete playerTwo[0]["score"];
  this.setState({players: players})
  this.writeUserData();
 }

 writeUserData() {
   firebase.database().ref('players/').set({
       players: this.state.players
   });
 }

 render() {
   const { players } = this.state;
    return (
        <div className="container">
          <div>
            Player One <input ref="p1Name"/>
            Player Two <input ref="p2Name"/>
            <button onClick={() => this.submit(
              {
                name: this.refs.p1Name.value,
                score: this.refs.p1Score.value
              },
              {
                name: this.refs.p2Name.value,
                score: this.refs.p2Score.value
              }
              )}>submit result
            </button>
          </div>
          <div>
            score <input ref="p1Score"/>
            score <input ref="p2Score"/>
          </div>

          <div className="table">
            <h1> Table </h1>
            {players.sort(function(a, b) {
                  return (a.rank) - (b.rank);
              }).map(function(player, index) {
              index +=1;
              return <div key={index}><span>{player.rank}. {player.name}</span></div>
            }, this)}
          </div>
        </div>
    );
  }
}

ReactDOM.render(<App />,
    document.getElementById('content'));
