import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../services";
import { filterInPlace, mapReverse } from "../constants.js"


class UserHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      people: []
    };
    this.handleVote = this.handleVote.bind(this);
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

  handleVote(personID, vote) {
    Services.votes.updateVote(personID, vote)
      .then(success => {
        if (success) {
          this.setState(prevState => {
            // TODO
            return prevState;
          });
        }
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="text-center">
              In House Rush
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmit}>
              <div
                className="form-group"
                style={{display:"flex"}}
              >
                <label
                  htmlFor="search"
                  className="sr-only"
                >
                  Search:
                </label>
                <input
                  type="text"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  placeholder="Search"
                  className="form-control"
                />
                <button
                  type="submit"
                  className="btn btn-default"
                >
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ul className="list-group">
              {
                this.state.people.map((person, i) => (
                  <li key={i} className="list-group-item">
                    <span>{person.firstname} {person.lastname}</span>
                    <span className="pull-right">
                      <button className="btn btn-xs">
                        <span className="glyphicon glyphicon-chevron-down">
                        </span>
                      </button>
                      <span className="number-circle">2</span>
                      <button className="btn btn-xs">
                        <span className="glyphicon glyphicon-chevron-up">
                        </span>
                      </button>
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserHome);
