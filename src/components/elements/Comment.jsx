import React, { Component } from "react";

import Services from "../../services";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentWillMount() {
    this.setState({commentText: this.props.person.comment.text});
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    // update backend after 1.5sec if user stopped typing
    const value = event.target.value;
    setTimeout(() => {
      this.handleComment(this.props.person.id, value);
    }, 1500);
  }

  handleComment(personID, text) {
    if (this.state.commentText === text) {
      Services.comments.updateComment(personID, text)
        .then(success => {
          if (!success) {
            // wait and try again on failure
            setTimeout(2000, () => handleComment(personID, text));
          }
        });
    }
  }

  render() {
    return (
      <input
        type="text"
        name="commentText"
        value={this.state.commentText}
        onChange={this.handleChange}
        placeholder="Comment"
        className="comment"
      />
    );
  }
}
