import request from "request-promise-native";

import { apiUrl } from "../constants.js"

export default {

  // create comment records for the current user
  // result: array of ids of created votes
  createComments: (personIDs) => {
    return Promise.resolve([]);
    return request({
      uri: apiUrl + "/comments",
      method: "POST",
      json: true,
      body: personIDs,
      transform: (res) => res.content
    });
  },

  // adds or updates a comment by a user on a person
  // result: 1 if successful, 0 otherwise
  updateComment: (personID, text) => {
    return Promise.resolve(1);
    return request({
      uri: apiUrl + "/comments/" + personID,
      method: "PUT",
      json: true,
      body: {
        text: text
      },
      transform: (res) => res.content
    });
  },

  // gets all the comments from the database by the logged-in user
  // result: array of comments (objects with id, personID, user, text)
  getCommentsByUser: () => {
    return Promise.resolve([]);
    return request({
      uri: apiUrl + "/comments",
      method: "GET",
      json: true,
      transform: (res) => res.content
    });
  }
}
