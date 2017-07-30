import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../services";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    Services.accounts.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.push("add-people");
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-default"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
