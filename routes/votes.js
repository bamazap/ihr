const express = require('express');

const router = express.Router();
const utils = require('../utils/utils');

function requireAuthentication(req, res, next) {
  if (!req.session.user) {
    utils.sendErrorResponse(res, 403, 'Not logged in.');
  } else {
    next();
  }
}

module.exports = (connection) => {
  router.all('*', requireAuthentication);

  // Get votes by active user
  // GET /votes
  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM votes WHERE user = ?;';
    connection.query(sql, req.session.user, (err, rows) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Get all votes
  // GET /votes/all
  router.get('/all', (req, res) => {
    const sql = 'SELECT * FROM votes;';
    connection.query(sql, (err, rows) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Create votes on people for active user
  // POST /votes
  router.post('/', (req, res) => {
    const values = req.body.map(personID => [req.session.user, personID, 0]);
    const sql = 'INSERT INTO votes (user, person, value) VALUES ?;';
    if (values.length) {
      connection.query(sql, [values], (err, result) => {
        if (err) {
          utils.sendErrorResponse(res, 500, err);
        } else {
          const newIDs = Array.from(new Array(result.affectedRows), (x, i) => i + result.insertId);
          utils.sendSuccessResponse(res, newIDs);
        }
      });
    }
  });

  // Update vote on person for active user
  // PUT /votes/:id
  router.put('/:person', (req, res) => {
    const { user } = req.session;
    const { person } = req.params;
    const { value } = req.body;
    const sql = 'UPDATE votes SET value = ? WHERE person = ? AND user = ?;';
    connection.query(sql, [value, person, user], (err, result) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.affectedRows);
      }
    });
  });

  return router;
};
