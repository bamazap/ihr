var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);

// Database
var mysql = require('mysql');
var credentials = require('./db.js'); // {host, user, password, database}
var connection = mysql.createConnection(credentials);

connection.connect()

// Require routes
var users = require('./routes/users')(connection);
var people = require('./routes/people')(connection);
var votes = require('./routes/votes')(connection);

/**
 * Require authentication.
 * Checks if req.currentUser is set and sends an error if it is not.
 */
var requireAuthentication = function(req, res, next) {
  if (!req.currentUser) {
    utils.sendErrorResponse(res, 403, 'Not logged in.');
  } else {
    next();
  }
};
people.all('*', requireAuthentication);
votes.all('*', requireAuthentication);

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sessionStore = new MySQLStore({}, connection);
app.use(session({
  key: "session_cookie_name",
  secret: "session_cookie_secret",
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

// API Routes
app.use('/api/users', users);
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
