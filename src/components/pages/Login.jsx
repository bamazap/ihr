import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../../services";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kerberos: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Services.accounts.login(this.state.kerberos)
      .then(res => {
        if (this.state.kerberos === "d-entry") {
          this.props.history.push("add-people");
        } else {
          this.props.history.push("home");
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-main">
            <h1 className="text-center">
              D-Entry In House Rush 2017
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-main">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="kerberos" className="sr-only">
                  Kerberos
                </label>
                <input
                  type="text"
                  name="kerberos"
                  value={this.state.kerberos}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Kerberos"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-default btn-default pull-right"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
