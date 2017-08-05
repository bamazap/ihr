import React, { Component } from "react";

import Delete from "../elements/Delete.jsx";
import PersonList from "../elements/PersonList.jsx";

export default class PeopleForUser extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-main">
            <PersonList people={this.props.people}>
              <Delete handleDelete={this.props.handleDelete} />
            </PersonList>
          </div>
        </div>
      </div>
    )
  }
}
