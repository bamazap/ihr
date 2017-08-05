import React, { Component } from "react";

export default class AddPersonForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: ""
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
    this.props.addPerson(this.state.firstname, this.state.lastname);
    this.setState({
      firstname: "",
      lastname: ""
    });
    this.firstnameInput.focus();
  }

  render() {
    return (
      <div className="container top-bar">
        <div className="row">
          <div className="col-main">
            <h1 className="text-center">
              Add a Person
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-main">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group" style={{display:"flex"}}>
                <label htmlFor="firstname" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="First Name"
                  ref={(input) => { this.firstnameInput = input; }}
                />
                <label htmlFor="lastname" className="sr-only">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Last Name"
                />
                <button
                  type="submit"
                  className="btn btn-default btn-default"
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
