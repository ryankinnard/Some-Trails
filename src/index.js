import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { trailsRouter } from './routes';
import { isLoggedOn, addMiddlewares } from './middlewares';

const express = require('express');
const passport = require('passport');
require('dotenv').config();

if (!process.env.HIKING_PROJECT_KEY) {
  console.warn(
    `no HIKING_PROJECT_KEY set! Calls to get hiking paths wont work until this is set in the .env file. See env.sample.`,
  );
}
const app = express();
const morgan = require('morgan');

function isLoggedOn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.warn('not logged in so redirecting!');
  res.redirect('/login');
}

// Configure the local strategy for use by Passport.
passport.use(
  new Strategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err, null);
      }
      if (!user || user.password != password) {
        return cb(null, null);
      }
      return cb(null, user);
    });
  }),
);

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Configure view engine
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);
app.set('views', __dirname + '/views');

const port = process.env.PORT || 3000;
addMiddlewares(app);

// configure routes
app.use('/trails', trailsRouter);

// @todo move login stuff to seperate route&controller
app.get('/', function (req, res) {
  res.render('home', { user: req.user });
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
