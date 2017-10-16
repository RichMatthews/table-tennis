import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './firebase/config.js';
import Slack from 'browser-node-slack';

import AddPlayer from './components/AddPlayer';
import Players from './components/Players';
import Table from './components/Table';
import Matches from './components/Matches';


import './index.scss';

class App extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     players: [],
     matches: [],
     months: [],
     display: null,
     loading: true
   }
 }

 componentDidMount = () => {
   this.pullFromDB('players');
   this.pullFromDB('matches');
   this.pullMonths()
 }

 pullFromFirebase = (query) => {
   return new Promise((resolve, reject) => {
     firebase.database().ref(query).on('value', resolve);
   });
 }

 pullMonths = () => {
   try {
     const query = firebase.database().ref('matches/' + 'bymonth/').orderByKey();
     query.once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const childData = childSnapshot.val();
          this.setState({months: this.state.months.concat([childData])})
          this.setState({loading: false})
        });
      });
   }
   catch(err){
     console.error(`${err}, no data for months`);
   }
 }

 pullFromDB = (routeName) => {
   this.pullFromFirebase(`/${routeName}/${routeName}`).then((data) => {
     try {
       const pulledContent = Object.keys(data.val()).map(function(key) {
         return data.val()[key];
       })
       this.setState({[routeName]: pulledContent});
     }
     catch(err){
       console.error(`${err}, no data for ${routeName}`);
     }
  })
 }

addPlayer = (name) => {
  const players = this.state.players;
  players.sort(function(a, b) {
    return (a.rank) - (b.rank);
  })
  const lastPosition = players.slice(-1)[0];
  const latestRank = lastPosition.rank +1;
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
    const players = this.state.players;
    const person = players.find(function(player){
      return player.name == p.name;
    });
    return person;
 }

 changeRank(winner, loser) {
   const tempRank = winner.rank;
   winner.rank = loser.rank;
   loser.rank = tempRank;
 }

 submit = (player1, player2) => {
  //  this.clearInput();
   const players = this.state.players;
   const playerOne = this.getPlayer(player1);
   const playerTwo = this.getPlayer(player2);
   if (playerOne == playerTwo){
      alert('A player cant play themselves. R u daft?')
   }
   else {
     playerOne.score = player1.score;
     playerTwo.score = player2.score;
     const result = this.workOutWinner(playerOne, playerTwo);
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
     this.resultSubmitted();
   }
 }

 writeUserData() {
   firebase.database().ref('players/').set({
       players: this.state.players
   });
 }

 resultSubmitted() {
   this.setState({resultShown: true})
 }

 postToSlack(winner, loser){
   const slackName = this.state.slackNameValue;
   const slack = new Slack('https://hooks.slack.com/services/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');
   slack.send({
     channel: "#rich-test-public",
     username: "table-tennis-bot",
     icon_emoji: ":table_tennis_paddle_and_ball:",
     text: `<@${winner.name}> ${winner.score}-${loser.score} <@${loser.name}>`
   });
 };

postMatch(playerOne, playerTwo) {
  const matches = this.state.matches;
  const date = new Date();
  const formattedDate = this.formatDate(date)
  const match = {
    playerOne: {
      name: playerOne.name,
      score: playerOne.score
    },
    playerTwo: {
      name: playerTwo.name,
      score: playerTwo.score
    },
    day: formattedDate.day,
    month: 'october',
    year: formattedDate.year
  }
  this.setState({matches: this.state.matches.concat([match])}, function() {
    firebase.database().ref('matches/').update({
      matches: this.state.matches
    });
  });
  this.byMonthData(match.month, playerOne, playerTwo)
}

byMonthData(month, playerOne, playerTwo){
  const postData = {
    month: month,
    p1: {
      name: playerOne.name,
      score: playerOne.score
    },
    p2: {
      name: playerTwo.name,
      score: playerTwo.score
    },
  };
  const updates = {};
  const newPostKey = firebase.database().ref().child('matches' + '/bymonth' + '/' + month).push().key;
  updates['matches' + '/bymonth' + '/' + month + '/' + 'matches/' + this.getLatestId()] = postData;
  return firebase.database().ref().update(updates);
}

getLatestId(){
  let highestNumber = 0;
  this.state.months.map((month) => {
    if (month.matches.length > highestNumber){
      highestNumber = month.matches.length;
    }
  })
  return highestNumber;
}

toggle() {
  this.setState(prevState => ({
    showTable: !prevState.showTable
  }));
}

clearInput() {
  this.refs.p1Name.value = '';
  this.refs.p2Name.value = '';
  this.refs.p1Score.value = '';
  this.refs.p2Score.value = '';
}

formatDate(date) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return {
    day: day,
    month: monthNames[monthIndex],
    year: year
  }
}

showComponent(componentName) {
  this.setState({display: componentName});
}

 render() {
   if (this.state.loading){
     return <div>Loading...</div>
   }
   const { players, matches, months } = this.state;
   const components = {
    "AddPlayer": <AddPlayer
                    addPlayer={this.addPlayer.bind(this)}
                 />,
    "ShowPlayers": <Players
                    players={players}
                    submit={this.submit.bind(this)}
                  />,
    "Table": <Table
            players={players}
            />,
    "Matches": <Matches
                months={months}
                matches={matches}
               />
    };
    return (
        <div className="container">
          <div className="heading">
            <h1> Table Tennis Rankings Leaderboard </h1>
          </div>
          <div className="navigation">
            <button className="navBtn target" onClick={() => this.showComponent('AddPlayer')}>Add</button>
            <button className="navBtn target" onClick={() => this.showComponent('ShowPlayers')}>New Match</button>
            <button className="navBtn target" onClick={() => this.showComponent('Table')}>Table</button>
            <button className="navBtn target" onClick={() => this.showComponent('Matches')}>Previous Matches</button>
          </div>
          <div className="component-container">
            {components[this.state.display]}
          </div>
      </div>
    );
  }
}

ReactDOM.render(<App />,
    document.getElementById('content'));
