import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';

const express = require('express');
const passport = require('passport');
var users = require('./db');
require('dotenv').config();

if (!process.env.HIKING_PROJECT_KEY) {
  console.warn(
    `no HIKING_PROJECT_KEY set! Calls to get hiking paths wont work until this is set in the .env file. See env.sample.`,
  );
}
const app = express();

const port = process.env.PORT || 3000;
addMiddlewares(app);

// configure routes
app.use('/trails', trailsRouter);

app.use(express.static('db'));

// @todo move login stuff to seperate route&controller
app.get('/', function (req, res) {
  res.render('home', { user: req.user, users: users });
});

app.post('/', function (req, res) {
  window.alert('hello from index.js');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/profile', isLoggedOn, function (req, res) {
  res.render('profile', { user: req.user });
});

app.get('/nearby', function (req, res) {
  res.render('nearby');
});

app.get('/gear', function (req, res) {
  res.render('gear');
});

// start server
app.listen(port, () => {
  console.log(`Trail Finder is listening on port http://localhost:${port}`);
});
