import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter, newUserRouter, authRouter, nearbyRoute } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';
import { ziptoLatLon } from './controllers';
import { findTrailsNear } from './controllers';
import { findTrailsNear, HikingProjectOptions } from './controllers';
import { findDistanceToTrail } from './controllers';

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
  res.render('home', { user: req.user });
});

app.use('/newUser', newUserRouter);

app.use('/createUser', newUserRouter);

// nearby router
app.use('/nearby', nearbyRoute);

app.get('/profile', isLoggedOn, function (req, res) {
  res.render('profile', { user: req.user });
});

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
