const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let gear = {
    temp: 30,
    elevationGain: 2005,
    boots: 'https://www.flaticon.com/svg/static/icons/svg/2826/2826618.svg',
    lightJacket:
      'https://www.flaticon.com/svg/static/icons/svg/3126/3126039.svg',
    heavyJacket: 'https://www.flaticon.com/svg/static/icons/svg/614/614247.svg',
    poles: 'https://www.flaticon.com/svg/static/icons/svg/2325/2325148.svg',
    desBoots:
      'Wear a solid pair of hiking boots as the terrain can be challenging',
    desHeavyJacket: "Bring a heavier jacket, it's below 32°F",
    desLightJacket: "Bring a lighter jacket, it's above 32°F",
    desPoles: 'Bring hiking poles, the elevation gain is more than 2000 feet',
  };
  res.render('nearby', { gear: gear });
});

export const nearbyRoute = router;
