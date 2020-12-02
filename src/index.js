import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter, newUserRouter, authRouter, nearbyRoute } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';
import {
  findTrailsNear,
  findDistanceToTrail,
  ziptoLatLon,
} from './controllers';
import {
  Coordinate,
  getDifficultyIconPath,
  parseDifficultyFromNum,
  DirectionsFactory,
} from './models';

const express = require('express');

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
app.use('/', authRouter);
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
  results.forEach((result) => {
    const trailLocation = new Coordinate(result.latitude, result.longitude);
    result.distance = findDistanceToTrail(result, coordinate);
    result.time = result.length / 2 + 0.5 * (result.ascent / 1000);
    result.directionLink = DirectionsFactory.createGoogleDirectionLink(
      trailLocation,
    );
  });

  res.render('search-results', { results });
});

// start server
app.listen(port, () => {
  console.log(`Trail Finder is listening on port http://localhost:${port}`);
});
