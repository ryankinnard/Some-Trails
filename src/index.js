import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter, newUserRouter } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';
import { ziptoLatLon } from './controllers';
import { findTrailsNear, HikingProjectOptions } from './controllers';
import { findDistanceToTrail } from './controllers';
import { getDifficultyIconPath, parseDifficultyFromNum } from './models';

const express = require('express');
const passport = require('passport');
const nearbyRoute = require('./routes/nearby');

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

app.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('nearby');
  } else {
    res.render('home', {
      user: req.user,
      showNewUserModal: req.showNewUserModal,
    });
  }
});

app.use('/newUser', newUserRouter);
app.post('/newUser', newUserRouter);

// nearby router
app.use('/nearby', nearbyRoute);

app.get('/login', function (req, res) {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  nearbyRoute,
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/profile', isLoggedOn, function (req, res) {
  const diffIcon = getDifficultyIconPath(
    parseDifficultyFromNum(req.user.difficultyLevel),
  );
  res.render('profile', { user: req.user, diffIcon: diffIcon });
});

app.post('/newuser', newUserRouter);

app.post('/search', async function redirectToSearch(req, res) {
  const coordinate = await ziptoLatLon(req.body.zip);
  const results = await findTrailsNear(coordinate);
  results.forEach((element) => {
    element.distance = findDistanceToTrail(element, coordinate);
    element.time = element.length / 2 + 0.5 * (element.ascent / 1000);
  });
  console.log(results);
  res.render('search-results', { results: results });
});

// start server
app.listen(port, () => {
  console.log(`Trail Finder is listening on port http://localhost:${port}`);
});
