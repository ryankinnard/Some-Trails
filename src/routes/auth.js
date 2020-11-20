import express from 'express';

const passport = require('passport');
const router = express.Router();

router.get('/login', function (req, res) {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

export const authRouter = router;
