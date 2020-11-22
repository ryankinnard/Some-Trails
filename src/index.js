import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter, newUserRouter } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';
import { ziptoLatLon } from './controllers';
import { findTrailsNear, HikingProjectOptions } from './controllers';

const express = require('express');
const passport = require('passport');

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

// @todo move login stuff to seperate route&controller
app.get('/', function (req, res) {
  res.render('home', { user: req.user });
});

app.use('/newUser', newUserRouter);

app.use('/createUser', newUserRouter);

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

app.post('/search', async function redirectToSearch(req, res) {
  const coordinate = await ziptoLatLon(req.body.zip);
  const results = await findTrailsNear(coordinate);
  console.log(results);
  res.render('search-results', { array: results });
});

// start server
app.listen(port, () => {
  console.log(`Trail Finder is listening on port http://localhost:${port}`);
});
