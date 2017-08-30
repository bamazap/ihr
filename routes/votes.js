var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrorResponse(res, 403, 'Not logged in.');
  } else {
    next();
  }
};

module.exports = function(connection) {
  router.all('*', requireAuthentication);

  // Get votes
  // GET /votes
  router.get('/', function(req, res) {
    console.log(req.session.user);
    utils.sendSuccessResponse(res, []);
  });

  // Create votes
  // POST /votes
  router.post('/', function(req, res) {
    var personIDs = req.body;
    const output = personIDs.map((id, i) => i);
    utils.sendSuccessResponse(res, output);
  });

  // Update vote
  // PUT /votes/:id
  router.put('/:id', function(req, res) {
    var id = req.params.id;
    var value = req.body.value;
    utils.sendSuccessResponse(res, 1);
  });

  return router;
}