import React, { Component } from "react";

export default class PersonList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="list-group">
        {
          this.props.people
            .map((person, i) => (
            <li
              key={i}
              className="list-group-item person"
            >
              <div style={{width: "100%", display: "flex"}}>
                <span className="person-name">
                  {person.firstname} {person.lastname}
                </span>
                <span className="pull-right">
                  {
                    React.Children.map(this.props.children, (child) =>
                      React.cloneElement(child, {person: person})
                    )
                  }
                </span>
              </div>
              <div style={{width: "100%"}}>
                <input
                  type="text"
                  placeholder="Comment"
                  className="comment"
                />
              </div>
            </li>
          ))
        }
      </ul>
    )
  }
}
