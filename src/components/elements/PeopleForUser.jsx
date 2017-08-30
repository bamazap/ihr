import React, { Component } from "react";
import Services from "../../services";
import { filterInPlace } from "../../constants.js"

import Vote from "../elements/Vote.jsx";
import PersonList from "../elements/PersonList.jsx";


// Update in the back end if you change this.
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
    Promise.all([
      Services.people.getPeople(),
      Services.votes.getVotesByUser(),
      Services.comments.getCommentsByUser()
    ])
      // add votes to people
      .then(arr => {
        // TODO: I swear there is shorthand for this
        const people = arr[0];
        const votes = arr[1];
        const comments = arr[2];
        const newPeople = []; // track people that didn't have votes
        people.forEach(person => {
          // this is O(n^2) -- we can do better -- but do we care?
          let vote = votes.find((vote) => vote.person === person.id);
          person["vote"] = vote;
          let comment = comments.find(comment => comment.person === person.id);
          person["comment"] = comment;
          if (comment === undefined || vote === undefined) {
            newPeople.push(person);
          }
        })
        if (newPeople.length) {
          return Promise
            .all([
              Services.votes.createVotes(newPeople.map(person => person.id))
                .then(voteIDs => {
                  voteIDs.forEach((id, i) => {
                    newPeople[i].vote = {id: id, value: 0};
                  });
                }),
              Services.comments.createComments(newPeople.map(person => person.id))
                .then(commentIDs => {
                  commentIDs.forEach((id, i) => {
                    newPeople[i].comment = {id: id, text: ""};
                  });
                })
            ])
            .then(_ => people);
        }
        return people;
      })
      .then(people => {
        this.setState(prevState => {
          prevState.people = people;
          return prevState;
        });
      });
  }

  handleVote(person, vote) {
    return () => {
      let newValue = person.vote.value + vote;
      newValue = Math.max(MIN_VOTE, Math.min(newValue, MAX_VOTE));
      Services.votes.updateVote(person.id, newValue)
        .then(success => {
          if (success) {
            this.setState(prevState => {
              person.vote.value = newValue;
              return prevState;
            });
          }
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
            <PersonList
              people={this.state.people.filter(searchFilter)}
              comments={true}
            >
              <Vote handleVote={this.handleVote} />
            </PersonList>
          </div>
        </div>
      </div>
    )
  }
}
