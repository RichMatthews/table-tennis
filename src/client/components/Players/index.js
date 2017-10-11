import React from 'react';
import update from 'immutability-helper';
import { Dropdown, Input } from 'semantic-ui-react';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: {
        name: '',
        score: ''
      },
      playerTwo: {
        name: '',
        score: ''
      }
    }
    this.selectPlayerOne = this.selectPlayerOne.bind(this);
    this.selectPlayerTwo = this.selectPlayerTwo.bind(this);
    this.handlePlayerOneScore = this.handlePlayerOneScore.bind(this);
    this.handlePlayerTwoScore = this.handlePlayerTwoScore.bind(this);
  }

  selectPlayerOne(e, data) {
    const p1 = this.state.playerOne;
    p1.name = data.value
    this.setState({p1: p1})
  }

  selectPlayerTwo(e, data) {
    const p2 = this.state.playerTwo;
    p2.name = data.value
    this.setState({p2: p2})
  }

  handlePlayerOneScore(e){
    const p1 = this.state.playerOne;
    p1.score = e.target.value
    this.setState({p1: p1})
  }

  handlePlayerTwoScore(e){
    const p2 = this.state.playerTwo;
    p2.score = e.target.value
    this.setState({p2: p2})
  }

  render() {
    let players = [];
    this.props.players.map((player) => {
      players.push({text: player.name, value: player.name})
    });
    return (
      <div className="playersContainer">
        <div className="players">
          <Dropdown onChange={this.selectPlayerOne} placeholder='Select Player One' fluid selection options={players} />
          <Input onChange={this.handlePlayerOneScore} placeholder="score" type="number"/>
        </div>
        <div className="players">
          <Dropdown onChange={this.selectPlayerTwo} placeholder='Select Player Two' fluid selection options={players} />
          <Input onChange={this.handlePlayerTwoScore} placeholder="score" type="number"/>
        </div>
        <div className="submitData">
          <button className="submitBtn" onClick={() => this.props.submit(this.state.playerOne, this.state.playerTwo)}>submit result</button>
        </div>
      </div>
    )
  }
}

export default Player;
