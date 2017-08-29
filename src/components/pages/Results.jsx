import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../../services";


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: []
    };
  }

  componentWillMount() {
    Promise.all([
      Services.people.getPeople(),
      Services.votes.getAllVotes()
    ])
      // add votes to people
      .then(arr => {
        // TODO: I swear there is shorthand for this
        const people = arr[0];
        const votes = arr[1];
        // initialize each person's total vote count to 0
        people.forEach(person => {
          person["totalVotes"] = 0;
        })
        // go through each vote and add them to the correct person
        votes.forEach(vote => {
          const person = people.find(person => person.id == vote.person);
          person["totalVotes"] += vote.value;
        })
        people.sort((pA, pB) => pA["totalVotes"] < pB["totalVotes"] ? 1 : -1);
        return people;
      })
      .then(people => {
        this.setState(prevState => {
          prevState.people = people;
          return prevState;
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-main">
            <h1 className="text-center">
              D-Entry In House Rush 2017 Results
            </h1>
            <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
            {this.state.people.map((person, idx) => (
              <tr key={idx}>
                <td>{person.firstname}</td>
                <td>{person.lastname}</td>
                <td>{person["totalVotes"]}</td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Results);
