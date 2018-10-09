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

  // Get people
  // GET /people
  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM people;';
    connection.query(sql, (err, rows) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Create person
  // POST /people
  router.post('/', (req, res) => {
    const person = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    const sql = 'INSERT INTO people SET ?';
    connection.query(sql, person, (err, result) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.insertId);
      }
    });
  });

  // Delete person
  // DELETE /people
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM people WHERE id = ?';
    connection.query(sql, id, (err, result) => {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.affectedRows);
      }
    });
  });

  return router;
};
