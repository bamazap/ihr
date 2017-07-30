import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../services";
import { filterInPlace, mapReverse } from "../constants.js"


class AddPeople extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      people: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    Services.people.getPeople()
      .then(res => this.setState(prevState => {
        prevState.people = res;
        return prevState;
      }));
  }

  componentDidMount(){
    this.firstnameInput.focus();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Services.people.addPerson(this.state.firstname, this.state.lastname)
      .then(id => {
        if (id) {
          this.setState(prevState => {
            prevState.people.push({
              firstname: prevState.firstname,
              lastname: prevState.lastname,
              id: id
            });
            prevState.firstname = "";
            prevState.lastname = "";
            return prevState;
          });
          this.firstnameInput.focus();
        }
      });
  }

  handleDelete(id) {
    Services.people.deletePerson(id)
      .then(numDeleted => {
        if (numDeleted) {
          this.setState(prevState => {
            filterInPlace(prevState.people, (person) => {
              return person.id !== id;
            });
            return prevState;
          });
        }
      });
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <h1>Add a Person</h1>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <input
                type="submit"
                value="+"
                className="btn btn-default"
              />
            </form>
          </div>
          <div className="row">
            {
              mapReverse(this.state.people, (person, i) => (
                <div key={i}>
                  <span>{person.firstname} {person.lastname} </span>
                  <button onClick={() => this.handleDelete(person.id)}>
                    -
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AddPeople);
