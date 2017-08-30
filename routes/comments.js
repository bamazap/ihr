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

  // Get comments by active user
  // GET /comments
  router.get('/', function(req, res) {
    sql = "SELECT * FROM comments WHERE user = ?;";
    connection.query(sql, req.session.user, function (err, rows, fields) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, rows);
      }
    });
  });

  // Create comments on people for active user
  // POST /comments
  router.post('/', function(req, res) {
    const values = req.body.map(personID => [req.session.user, personID, ""]);
    const sql = "INSERT INTO comments (user, person, text) VALUES ?;";
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

  // Update comment on person for active user
  // PUT /comments/:id
  router.put('/:person', function(req, res) {
    const user = req.session.user;
    const person = req.params.person;
    var text = req.body.text;
    sql = "UPDATE comments SET text = ? WHERE person = ? AND user = ?;"
    connection.query(sql, [text, person, user], function(err, result) {
      if (err) {
        utils.sendErrorResponse(res, 500, err);
      } else {
        utils.sendSuccessResponse(res, result.affectedRows);
      }
    });
  });

  return router;
}