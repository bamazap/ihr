import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import withStickyTop from "../HOCs/withStickyTop.jsx";
import SearchBar from "../elements/SearchBar.jsx";
import PeopleForUser from "../elements/PeopleForUser.jsx";


const PageContent = withStickyTop(SearchBar, PeopleForUser);

class UserHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ""
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(search) {
    this.setState({search: search});
  }

  render() {
    return (
      <PageContent
        updateSearch={this.updateSearch}
        search={this.state.search}
      />
    )
  }
}

export default withRouter(UserHome);
