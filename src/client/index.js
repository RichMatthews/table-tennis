import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { rootRef } from './firebase/config.js';

import Matches from './components/Matches';
import Table from './components/Table';

import './index.scss';

class App extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     players: [],
     matches: [],
     showTable: true
   }
 }

 componentDidMount = () => {
   this.pullFromDB('players');
   this.pullFromDB('matches');
 }

 pullFromFirebase = (query) => {
   return new Promise((resolve, reject) => {
     firebase.database().ref(query).on('value', resolve);
   });
 }

 pullFromDB = (routeName) => {
   this.pullFromFirebase(`/${routeName}/${routeName}`).then((data) => {
     try {
       let pulledContent = Object.keys(data.val()).map(function(key) {
         return data.val()[key];
       })
       this.setState({[routeName]: pulledContent});
     }
     catch(err){
       console.log('no data');
     }
  })
 }

addPlayer = (name) => {
  let players = this.state.players;
  let lastPosition, latestRank;
  players.sort(function(a, b) {
    return (a.rank) - (b.rank);
  })
  lastPosition = players.slice(-1)[0];
  latestRank = lastPosition.rank +1;
  const newPerson = {
    name: name,
    rank: latestRank,
    played: 0,
    wins: 0,
    losses: 0
  }
  this.setState({players: this.state.players.concat([newPerson])}, function(){
    this.writeUserData()
  });
}

workOutWinner(playerOne, playerTwo) {
  return playerOne.score > playerTwo.score ? {
      winner: playerOne,
      loser: playerTwo
    } :
    {
      winner: playerTwo,
      loser: playerOne
    }
}

incrementStats(winner, loser) {
  winner.played += 1;
  loser.played += 1;
  winner.wins += 1;
  loser.losses += 1;
}

getPlayer(p) {
    let players = this.state.players;
    let person = players.find(function(player){
      return player.name == p.name;
    });
    return person;
 }

 changeRank(winner, loser) {
   var tempRank = winner.rank;
   winner.rank = loser.rank;
   loser.rank = tempRank;
 }

 submit = (player1, player2) => {
   let players = this.state.players;
   let playerOne = this.getPlayer(player1);
   let playerTwo = this.getPlayer(player2);
   if (playerOne == undefined || playerTwo == undefined){
      alert('one of these players does not exist')
   }
   else {
     playerOne.score = player1.score;
     playerTwo.score = player2.score;
     let result = this.workOutWinner(playerOne, playerTwo);
     this.postToSlack(result.winner, result.loser);
     this.postMatch(player1, player2);
     this.incrementStats(result.winner, result.loser);
     if (result.winner.rank > result.loser.rank){
       this.changeRank(result.winner, result.loser)
     }
     delete playerOne["score"];
     delete playerTwo["score"];
     this.setState({players: players})
     this.writeUserData();
   }
 }

 writeUserData() {
   firebase.database().ref('players/').set({
       players: this.state.players
   });
 }

 postToSlack(winner, loser){
   let slackName = this.state.slackNameValue;
   let Slack = require('browser-node-slack');
   let slack = new Slack('https://hooks.slack.com/services/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');
   slack.send({
     channel: "#consumer-tt-rankings",
     username: "table-tennis-bot",
     icon_emoji: ":table_tennis_paddle_and_ball:",
     text: `<@${winner.name}> ${winner.score}-${loser.score} <@${loser.name}>`
   });
 };

postMatch(playerOne, playerTwo) {
  let matches = this.state.matches;
  let date = new Date();
  let formattedDate = this.formatDate(date)
  const match = {
    playerOne: {
      name: playerOne.name,
      score: playerOne.score
    },
    playerTwo: {
      name: playerTwo.name,
      score: playerTwo.score
    },
    date: formattedDate
  }
  this.setState({matches: this.state.matches.concat([match])}, function() {
    firebase.database().ref('matches/').set({
      matches: this.state.matches
    });
  });
}

toggle() {
  this.setState(prevState => ({
    showTable: !prevState.showTable
  }));
}

formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


 render() {
   const { players, matches } = this.state;
    return (
        <div className="container">
          <div className="heading">
            <h1> Table Tennis Rankings Leaderboard </h1>
          </div>
          <div className="addPlayer">
            <input ref="addPlayer" placeholder="add new player" />
            <button onClick={() => this.addPlayer(this.refs.addPlayer.value)}>Add</button>
          </div>
          <div className="players">
            <input type="text" ref="p1Name" placeholder="slack name without the @" className="player" />
            <input ref="p1Score" placeholder="score" type="number" className="score"/>
          </div>
          <div className="players">
            <input type="text" ref="p2Name" placeholder="slack name without the @" className="player" />
            <input ref="p2Score" placeholder="score" type="number" className="score"/>
          </div>

          <div className="submitData">
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
          {this.state.showTable ?
            <div className="table">
            <button className="toggleButton" onClick={() => this.toggle()}>Show Matches</button>
            <Table
            players={players}
            />
            </div>
            :
            <div className="recentMatches">
            <button className="toggleButton" onClick={() => this.toggle()}>Show Table</button>
            <Matches
            matches={matches}
            />
            </div>
          }
        </div>
    );
  }
}

ReactDOM.render(<App />,
    document.getElementById('content'));
