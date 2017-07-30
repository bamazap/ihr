import React, { Component } from "react";
import { withRouter } from "react-router-dom";


class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="container">
        <h1>404 - Not Found</h1>
      </div>
    )
  }
}

export default withRouter(NotFound);
