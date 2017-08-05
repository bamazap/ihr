import React, { Component } from "react";

export default class Vote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var sign = function(n) {
      if (n > 0) {
        return "+";
      } else if (n === 0) {
        return "±";
      }
    }

    return (
      <div>
        <button
          className="btn btn-xs"
          onClick={this.props.handleVote(this.props.person, -1)}
        >
          <span className="glyphicon glyphicon-chevron-down">
          </span>
        </button>
        <span className="number-circle">
          {sign(this.props.person.vote)}{this.props.person.vote}
        </span>
        <button
          className="btn btn-xs"
          onClick={this.props.handleVote(this.props.person, 1)}
        >
          <span className="glyphicon glyphicon-chevron-up">
          </span>
        </button>
      </div>
    )
  }
}
