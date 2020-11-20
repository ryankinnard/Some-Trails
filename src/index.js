import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter, newUserRouter, authRouter } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';

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
