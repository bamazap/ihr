const express = require('express');

const router = express.Router();
const utils = require('../utils/utils');

module.exports = (connection) => {
  // Log in
  // GET /users
  router.post('/', (req, res) => {
    const { username } = req.body;
    const sql = 'SELECT * FROM users;';
    connection.query(sql, (err, rows) => {
      if (err) {
        req.session.user = '';
        utils.sendErrorResponse(res, 403, 'Invalid username.');
      } else {
        const legalUsernames = rows.map(user => user.username);
        if (legalUsernames.indexOf(username) >= 0) {
          req.session.user = username;
          utils.sendSuccessResponse(res, req.session.user);
        } else {
          req.session.user = '';
          utils.sendErrorResponse(res, 403, 'Invalid username.');
        }
      }
      req.session.save();
    });
  });

  return router;
};
