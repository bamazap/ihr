import request from "request-promise-native";

import { apiUrl } from "../constants.js"

export default {

  // adds a peson with the given firstname and lastname
  // result: the id (number) of the person added
  addPerson: (firstname, lastname) => {
    return request({
      uri: apiUrl + "/people",
      method: "POST",
      json: true,
      body: {
        firstname: firstname,
        lastname: lastname
      },
      transform: (res) => res.content
    });
  },

  // deletes a person with the given id
  // result: the number of people deleted (should be 0 or 1)
  deletePerson: (id) => {
    return request({
      uri: apiUrl + "/people/" + id,
      method: "DELETE",
      json: true,
      transform: (res) => res.content
    });
  },

  // gets all the people from the database
  // result: array of people (objects with id, firstname, and lastname)
  getPeople: () => {
    return request({
      uri: apiUrl + "/people",
      method: "GET",
      json: true,
      transform: (res) => res.content
    });
  }
}
