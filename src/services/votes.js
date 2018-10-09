import request from 'request-promise-native';

import { apiUrl } from '../constants';

export default {

  // create a vote records for the current user
  // result: array of ids of created votes
  createVotes: personIDs => request({
    uri: `${apiUrl}/votes`,
    method: 'POST',
    json: true,
    body: personIDs,
    transform: res => res.content,
  }),

  // adds or updates a vote by a user on a person
  // result: true if successful, false otherwise
  updateVote: (personID, value) => request({
    uri: `${apiUrl}/votes/${personID}`,
    method: 'PUT',
    json: true,
    body: {
      value,
    },
    transform: res => res.content,
  }),

  // gets all the votes from the database by the logged-in user
  // result: array of votes (objects with id, personID, username, value)
  getVotesByUser: () => request({
    uri: `${apiUrl}/votes`,
    method: 'GET',
    json: true,
    transform: res => res.content,
  }),

  // gets all the votes from the database
  // result: array of votes (objects with id, personID, username, value)
  getAllVotes: () => request({
    uri: `${apiUrl}/votes/all`,
    method: 'GET',
    json: true,
    transform: res => res.content,
  }),
};
