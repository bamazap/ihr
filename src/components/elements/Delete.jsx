import React, { Component } from "react";

export default class Delete extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="btn btn-xs"
        onClick={() => this.props.handleDelete(this.props.person.id)}
      >
        <span className="glyphicon glyphicon-remove">
        </span>
      </button>
    )
  }
}
