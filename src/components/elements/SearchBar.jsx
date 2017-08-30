import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.updateSearch(event.target.value);
  }

  handleSubmit(event) {
    this.props.updateSearch("");
    event.preventDefault();
  }

  render() {
    return (
      <div className="container top-bar">
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
                  value={this.props.search}
                  onChange={this.handleChange}
                  placeholder="Search"
                  className="form-control"
                  autoComplete="off"
                  onFocus={() => this.props.updateSearch("")}
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
    )
  }
}
