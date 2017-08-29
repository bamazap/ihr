import request from "request-promise-native";

import php_crud_api_transform from "../vendor/php_crud_api_transform.js";

import { apiUrl } from "../constants.js"

export default {

  // create a vote records for the current user
  // result: array of ids of created votes
  createVotes: (personIDs) => {
    return request({
      uri: apiUrl + "/votes",
      method: "POST",
      json: true,
      body: personIDs.map(id => { return {person: id, username: "barryam3"};})
    });
  },

  // adds or updates a vote by a user on a person
  // result: true if successful, false otherwise
  updateVote: (voteID, value) => {
    return request({
      uri: apiUrl + "/votes/" + voteID,
      method: "PUT",
      json: true,
      body: {
        value: value
      }
    });
  },

  // gets all the votes from the database by the logged-in user
  // result: array of votes (objects with id, personID, username, value)
  getVotesByUser: () => {
    return request({
      uri: apiUrl + "/votes",
      method: "GET",
      json: true,
      transform: (res) => php_crud_api_transform(res)["votes"]
    });
  },

  // gets all the votes from the database
  // result: array of votes (objects with id, personID, username, value)
  getAllVotes: () => {
    return request({
      uri: apiUrl + "/votes",
      method: "GET",
      json: true,
      body: {
        username: "*"
      },
      transform: (res) => php_crud_api_transform(res)["votes"]
    });
  }
}
