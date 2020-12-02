import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  trailsRouter,
  newUserRouter,
  authRouter,
  nearbyRouter,
} from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';

import { getDifficultyIconPath, parseDifficultyFromNum } from './models';

const express = require('express');

require('dotenv').config();

if (!process.env.HIKING_PROJECT_KEY) {
  console.warn(
    `no HIKING_PROJECT_KEY set! Calls to get hiking paths wont work until this is set in the .env file. 
    See env.sample.`,
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

// nearby router
app.use('/nearby', nearbyRouter);

app.get('/profile', isLoggedOn, function (req, res) {
  const diffIcon = getDifficultyIconPath(
    parseDifficultyFromNum(req.user.difficultyLevel),
  );
  const frontFacingDifficulty = getFrontFacingDifficulty(
    req.user.difficultyLevel,
  );
  res.render('profile', {
    user: req.user,
    recommendedDifficulty: frontFacingDifficulty,
    diffIcon: diffIcon,
  });
});

app.post('/newuser', newUserRouter);

// start server
app.listen(port, () => {
  console.log(`Trail Finder is listening on port http://localhost:${port}`);
});
