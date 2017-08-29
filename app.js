var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Database
var mysql = require('mysql');
var credentials = require('./db.js'); // {host, user, password, database}
var connection = mysql.createConnection(credentials);

connection.connect()

// Require routes
var people = require('./routes/people')(connection);
var votes = require('./routes/votes')(connection);

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/people', people);
app.use('/api/votes', votes);

// Static file routes
app.use('/build', express.static(path.join(__dirname, 'public/build')));

// Always host index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.set('port', 8000);
app.listen(app.get('port'), function() {
    console.log('Node App Started');
});
