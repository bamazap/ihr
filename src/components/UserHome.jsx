import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../services";
import { filterInPlace, mapReverse } from "../constants.js"

const MAX_VOTE = 2
const MIN_VOTE = -2

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
      .then(res => {
        res.forEach(person => person.vote = 0);
        this.setState(prevState => {
          prevState.people = res;
          return prevState;
        });
      });
  }

  handleVote(personID, vote) {
    return () => {
      // Services.votes.updateVote(personID, vote)
      //   .then(success => {
      //     if (success) {
      //       this.setState(prevState => {
      //         // TODO
      //         return prevState;
      //       });
      //     }
      //   });
      this.setState(prevState => {
        var person = prevState.people.find(p => p.id === personID);
        person.vote += vote;
        person.vote = Math.max(MIN_VOTE, Math.min(person.vote, MAX_VOTE));
        return prevState;
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      search: ""
    });
  }

  render() {
    var prefix = this.state.search.toUpperCase();
    var sign = function(n) {
      if (n > 0) {
        return "+";
      } else if (n === 0) {
        return "±";
      }
    }


    return (
      <div className="container">
        <div className="row">
          <div className="col-main">
            <h1 className="text-center">
              In House Rush
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-main">
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
                  className="btn btn-default btn-default"
                >
                  <span className="glyphicon glyphicon-remove"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-main">
            <ul className="list-group">
              {
                this.state.people
                  .filter((person) => (
                    person.firstname.toUpperCase().startsWith(prefix) ||
                    person.lastname.toUpperCase().startsWith(prefix)
                  ))
                  .map((person, i) => (
                  <li
                    key={i}
                    className="list-group-item person"
                  >
                    <span className="person-name">
                      {person.firstname} {person.lastname}
                    </span>
                    <span className="pull-right">
                      <button
                        className="btn btn-xs"
                        onClick={this.handleVote(person.id, -1)}
                      >
                        <span className="glyphicon glyphicon-chevron-down">
                        </span>
                      </button>
                      <span className="number-circle">
                        {sign(person.vote)}{person.vote}
                      </span>
                      <button
                        className="btn btn-xs"
                        onClick={this.handleVote(person.id, 1)}
                      >
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
