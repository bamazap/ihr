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

  // Get votes by active user
  // GET /votes
  router.get('/', function(req, res) {
    sql = "SELECT * FROM votes WHERE user = ?;";
    connection.query(sql, req.session.user, function (err, rows, fields) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Get all votes
  // GET /votes/all
  router.get('/all', function(req, res) {
    sql = "SELECT * FROM votes;";
    connection.query(sql, req.session.user, function (err, rows, fields) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Create votes on people for active user
  // POST /votes
  router.post('/', function(req, res) {
    const values = req.body.map(personID => [req.session.user, personID, 0]);
    const sql = "INSERT INTO votes (user, person, value) VALUES ?;";
    if (values.length) connection.query(sql, [values], function(err, result) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        const newIDs = Array.from(new Array(result.affectedRows), (x,i) => 
          i + result.insertId
        );
        utils.sendSuccessResponse(res, newIDs);
      }
    });
  });

  // Update vote on person for active user
  // PUT /votes/:id
  router.put('/:person', function(req, res) {
    const user = req.session.user;
    const person = req.params.person;
    var value = req.body.value;
    sql = "UPDATE votes SET value = ? WHERE person = ? AND user = ?;"
    connection.query(sql, [value, person, user], function(err, result) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.affectedRows);
      }
    });
  });

  return router;
}