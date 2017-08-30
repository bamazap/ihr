var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);

// Database
var mysql = require('mysql');
try {
  var credentials = require('./db.js');
} catch (err){
  var credentials = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB
  };
}

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(credentials);

  connection.connect(function(err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('handling disconnect');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

// Require routes
var users = require('./routes/users')(connection);
var people = require('./routes/people')(connection);
var votes = require('./routes/votes')(connection);
var comments = require('./routes/comments')(connection);

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
app.use('/api/comments', comments);

// Static file routes
app.use('/build', express.static(path.join(__dirname, 'public/build')));

// Always host index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
    console.log('Node App Started');
});
