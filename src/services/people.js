import request from "request-promise-native";

import php_crud_api_transform from "../vendor/php_crud_api_transform.js";

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
      }
    });
  },

  // deletes a person with the given id
  // result: the number of people deleted (should be 0 or 1)
  deletePerson: (id) => {
    return request({
      uri: apiUrl + "/people/" + id,
      method: "DELETE",
      json: true
    });
  },

  // gets all the people from the database
  // result: array of people (objects with id, firstname, and lastname)
  getPeople: () => {
    return request({
      uri: apiUrl + "/people",
      method: "GET",
      json: true,
      transform: (res) => php_crud_api_transform(res)["people"]
    });
  }
}
