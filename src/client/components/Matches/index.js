import React from 'react';
import update from 'immutability-helper';
import './index.scss';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      hidden: true
    }
    }
    expandRow(month) {
      if(month.name == this.state.active.name){
        this.setState({active: false})
        this.setState({hidden: false})
      }
      else {
        this.setState({active: month})
        this.setState({hidden: month})
      }
    }
    render() {
      return (
        <div className="matchesContainer">
          {this.props.months.map((month, monthIndex) => {
            return(
              <div>
               <div
                    key={monthIndex}
                    className={`${this.state.active === month ? 'active' : 'inactive'} month`}
                   >

                      <button onClick={() => this.expandRow(month)}>exp</button>
                      <div className={`${this.state.hidden === month ? '' : 'hidden'}`}>
                      </div>
                   </div>
              <div key={`${monthIndex}`} className="matches">
                <h3>{month.name}</h3>
                <input className="toggleBox" id="toggle" type="checkbox" />
                <label htmlFor="toggle"></label>
                <div>
                  <input type="text" placeholder="search by name"/>
                </div>
                {month.matches.map((match, matchIndex) => {
                return(

                  <div key={`$${matchIndex}`} className="expand match">
                    <span className="playerName"> {match.p1.name} </span>
                    <span className="playerScore"> {match.p1.score} - {match.p2.score}</span>
                    <span className="playerName"> {match.p2.name} </span>
                  </div>
                );
                })}
              </div>
            </div>
            );
          })}
        </div>
      )
    }
  }

export default Matches;
