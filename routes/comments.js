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

  // Get comments by active user
  // GET /comments
  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM comments WHERE user = ?;';
    connection.query(sql, req.session.user, (err, rows) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Create comments on people for active user
  // POST /comments
  router.post('/', (req, res) => {
    const values = req.body.map(personID => [req.session.user, personID, '']);
    const sql = 'INSERT INTO comments (user, person, text) VALUES ?;';
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

  // Update comment on person for active user
  // PUT /comments/:id
  router.put('/:person', (req, res) => {
    const { user } = req.session;
    const { person } = req.params;
    const { text } = req.body;
    const sql = 'UPDATE comments SET text = ? WHERE person = ? AND user = ?;';
    connection.query(sql, [text, person, user], (err, result) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.affectedRows);
      }
    });
  });

  return router;
};
