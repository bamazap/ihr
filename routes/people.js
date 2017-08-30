var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var requireAuthentication = function(req, res, next) {
  if (!req.session.user) {
    utils.sendErrorResponse(res, 403, 'Not logged in.');
  } else {
    next();
  }
};

module.exports = function(connection) {
  router.all('*', requireAuthentication);

  // Get people
  // GET /people
  router.get('/', function(req, res) {
    const sql = "SELECT * FROM people;";
    connection.query(sql, function (err, rows, fields) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Create person
  // POST /people
  router.post('/', function(req, res) {
    const person = {
      firstname: req.body.firstname,
      lastname: req.body.lastname
    };
    const sql = "INSERT INTO people SET ?";
    connection.query(sql, person, function(err, result) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.insertId);
      }
    });
  });

  // Delete person
  // DELETE /people
  router.delete('/:id', function(req, res) {
    const id = req.params.id;
    var sql = "DELETE FROM people WHERE id = ?";
    connection.query(sql, id, function (err, result) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.affectedRows);
      }
    });
  });

  return router;
}