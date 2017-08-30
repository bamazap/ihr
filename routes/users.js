var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

module.exports = function(connection) {
  // Log in
  // GET /users
  router.post('/', function(req, res) {
    const username = req.body.username;
    sql = "SELECT * FROM users;";
    connection.query(sql, function (err, rows, fields) {
      if (err) {
        req.session.user = "";
        utils.sendErrorResponse(res, 403, "Invalid username.");
      } else {
        const legalUsernames = rows.map(user => user.username);
        if (legalUsernames.indexOf(username) >= 0) {
          req.session.user = username;
          utils.sendSuccessResponse(res, req.session.user);
        } else {
          req.session.user = "";
          utils.sendErrorResponse(res, 403, "Invalid username.");
        }
      }
      req.session.save();
    });
  });

  return router;
}