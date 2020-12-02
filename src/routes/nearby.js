const express = require('express');
const router = express.Router();
import {
  findTrailsNear,
  findDistanceToTrail,
  ziptoLatLon,
} from '../controllers';
import { Coordinate, DirectionsFactory } from '../models';

const gear = {
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

router
  .get('/', function (req, res) {
    res.render('nearby', { results: [], gear, user: req.user });
  })
  .post('/', async function (req, res) {
    let results;
    if (req.body.zip) {
      const coordinate = await ziptoLatLon(req.body.zip);
      results = await findTrailsNear(coordinate);
      results.forEach((result) => {
        const trailLocation = new Coordinate(result.latitude, result.longitude);
        result.distance = findDistanceToTrail(result, coordinate);
        result.time = result.length / 2 + 0.5 * (result.ascent / 1000);
        result.directionLink = DirectionsFactory.createGoogleDirectionLink(
          trailLocation,
        );
      });
    } else {
      results = [];
    }
    res.render('nearby', { results, gear, user: req.user });
  });

export const nearbyRouter = router;
