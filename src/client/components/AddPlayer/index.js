import React from 'react';

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ''
    }
    this.handlePlayerName = this.handlePlayerName.bind(this);
  }

  handlePlayerName(e) {
    this.setState({playerName: e.target.value})
  }

  render() {
    return (
      <div className="addPlayer">
        <input className="addPlayerInpt" onChange={this.handlePlayerName} placeholder="Slack name without the @" />
        <p><button className="addBtn" onClick={() => this.props.addPlayer(this.state.playerName)}>Add Player</button></p>
      </div>
    )
  }
}

export default AddPlayer;
