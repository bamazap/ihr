import React, { Component } from "react";
import Services from "../../services";
import { filterInPlace, mapReverse } from "../../constants.js"

import Vote from "../elements/Vote.jsx";
import PersonList from "../elements/PersonList.jsx";


const MAX_VOTE = 2
const MIN_VOTE = -2

export default class PeopleForUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: []
    };
    this.handleVote = this.handleVote.bind(this);
  }

  componentWillMount() {
    Services.people.getPeople()
      .then(res => {
        res.forEach(person => person.vote = 0); // TODO: votes from backend
        this.setState(prevState => {
          prevState.people = res;
          return prevState;
        });
      });
  }

  handleVote(person, vote) {
    return () => {
      // TODO: put to backend
      this.setState(prevState => {
        person.vote += vote;
        person.vote = Math.max(MIN_VOTE, Math.min(person.vote, MAX_VOTE));
        return prevState;
      });
    }
  }

  render() {
    var query = this.props.search.toUpperCase();
    var searchFilter = (person) => (
      person.firstname.toUpperCase().startsWith(query) ||
      person.lastname.toUpperCase().startsWith(query)
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-main">
            <PersonList people={this.state.people.filter(searchFilter)}>
              <Vote handleVote={this.handleVote} />
            </PersonList>
          </div>
        </div>
      </div>
    )
  }
}
