const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');

let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), { encoding: 'utf8' }));
} catch (err) {
  credentials = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
  };
}

const connection = mysql.createPool(credentials);

// Require routes
const users = require('./routes/users')(connection);
const people = require('./routes/people')(connection);
const votes = require('./routes/votes')(connection);
const comments = require('./routes/comments')(connection);

// Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MySQLStore({}, connection);
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}));

// API Routes
app.use('/api/users', users);
app.use('/api/people', people);
app.use('/api/votes', votes);
app.use('/api/comments', comments);

// Static file routes
app.use('/build', express.static(path.join(__dirname, 'public/build')));

// Always host index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => {
  console.log('Node App Started'); // eslint-disable-line no-console
});
