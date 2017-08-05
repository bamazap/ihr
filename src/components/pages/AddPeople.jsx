import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Services from "../../services";
import { filterInPlace, mapReverse } from "../../constants.js"

import withStickyTop from "../HOCs/withStickyTop.jsx";
import AddPersonForm from "../elements/AddPersonForm.jsx";
import PeopleForBuilding from "../elements/PeopleForBuilding.jsx";


const PageContent = withStickyTop(AddPersonForm, PeopleForBuilding);

class AddPeople extends Component {
  constructor(props){
    super(props);
    this.state = {
      people: []
    };
    this.deletePerson = this.deletePerson.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }

  componentWillMount() {
    Services.people.getPeople()
      .then(res => {
        this.setState(prevState => {
          prevState.people = res;
          return prevState;
        });
      });
  }

  deletePerson(id) {
    Services.people.deletePerson(id)
      .then(numDeleted => {
        if (numDeleted) {
          this.setState(prevState => {
            filterInPlace(prevState.people, (person) => {
              return person.id !== id;
            });
            return prevState;
          });
        }
      });
  }

  addPerson(firstname, lastname) {
    Services.people.addPerson(firstname, lastname)
      .then(id => {
        if (id) {
          this.setState(prevState => {
            prevState.people.push({
              firstname: firstname,
              lastname: lastname,
              id: id
            });
            return prevState;
          });
        }
      });
  }

  render() {
    return (
      <PageContent
        people = {mapReverse(this.state.people, i => i)}
        addPerson = {this.addPerson}
        handleDelete = {this.deletePerson}
      />
    )
  }
}

export default withRouter(AddPeople);
