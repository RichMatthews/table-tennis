import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from '../../actions/actions';
console.log(incrementCounter, 'inccount');

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.count
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDecrementClick: () => {
      console.log('called');
      dispatch(decrementCounter)
    },
   onIncrementClick: () => {
     console.log('called');
     dispatch(incrementCounter)
   }
 }
}


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
    console.log(this.props, 'propos');

    return (
      <div className="addPlayer">
        <input className="addPlayerInpt" onChange={this.handlePlayerName} placeholder="Slack name without the @" />
        <p><button className="addBtn" onClick={() => this.props.addPlayer(this.state.playerName)}>Add Player</button></p>
        <p><button className="addBtn" onClick={this.props.onIncrementClick}>Increment Count</button></p>
        <p><button className="addBtn" onClick={this.props.onDecrementClick}>decrement Count</button></p>
        <h3>{this.props.count}</h3>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlayer)
