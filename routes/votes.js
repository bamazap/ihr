var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');


module.exports = function(connection) {
  // Get votes
  // GET /votes
  router.get('/', function(req, res) {
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