import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../services";
import { filterInPlace, mapReverse } from "../constants.js"

import Vote from "./Vote.jsx";
import PersonList from "./PersonList.jsx";

const MAX_VOTE = 2
const MIN_VOTE = -2

class UserHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      people: [],
      searchBarHeight: ""
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

  componentDidMount() {
    var searchbar = document.getElementById('stick-top');
    var style = searchbar.currentStyle || window.getComputedStyle(searchbar);
    var ht = searchbar.clientHeight;
    var mtop = style.marginTop;
    var mbot = style.marginBottom
    var offset = `calc(${mtop} + ${mbot} + ${ht}px)`;
    this.setState({searchBarHeight: offset});
  }

  render() {
    var query = this.state.search.toUpperCase();
    var searchFilter = (person) => (
      person.firstname.toUpperCase().startsWith(query) ||
      person.lastname.toUpperCase().startsWith(query)
    );

    return (
      <div>
        <div className="search-bar navbar-fixed-top" id="stick-top">
          <div className="container">
            <div className="row">
              <div className="col-main">
                <form onSubmit={this.handleSubmit}>
                  <div
                    className="form-group"
                    style={{display:"flex", marginTop:"15px"}}
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
                      autoComplete="off"
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
          </div>
        </div>
        {this.state.searchBarHeight && (
          <div
            className="container"
            style={{marginTop:this.state.searchBarHeight}}
          >
            <div className="row">
              <div className="col-main">
                <PersonList people={this.state.people.filter(searchFilter)}>
                  <Vote handleVote={this.handleVote} />
                </PersonList>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(UserHome);
