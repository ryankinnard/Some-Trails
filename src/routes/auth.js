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
  let gear = {
    icon: 'https://www.flaticon.com/svg/static/icons/svg/545/545674.svg',
    water: 'https://www.flaticon.com/svg/static/icons/svg/606/606797.svg',
    food: 'https://www.flaticon.com/svg/static/icons/svg/1046/1046857.svg',
    boots: 'https://www.flaticon.com/svg/static/icons/svg/2826/2826618.svg',
    poles: 'https://www.flaticon.com/svg/static/icons/svg/2325/2325148.svg',
    desInfo:
      'Hover over the icons to the right to see gear recommendations for this trail',
    desWaterThree: 'Bring 3 liters of water, trail is longer than eight miles',
    desWaterOne: 'Bring at least a liter of water',
    desFoodOne: 'Bring at least one snack',
    desFoodTwo: 'Bring at least two snacks, trail is longer than five miles',
    desBoots:
      'Wear a solid pair of hiking boots as the terrain can be challenging',
    desPoles: 'Bring hiking poles, the elevation gain is more than 700 feet',
  };
  req.session.gear = gear;
  res.redirect('nearby');
});

export const authRouter = router;
