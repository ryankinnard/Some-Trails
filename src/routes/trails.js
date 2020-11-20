import express from 'express';
import { Coordinate } from '../models';
import { findTrailsNear, HikingProjectOptions } from '../controllers';
import { findDistanceToTrail } from '../controllers';
import { ziptoLatLon } from '../controllers';

const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const {
      latitude,
      longitude,
      maxDistance,
      maxResults,
      sort,
      minLength,
      minStars,
    } = req.query;
    const coordinate = new Coordinate(latitude, longitude);
    const options = new HikingProjectOptions({
      maxDistance,
      maxResults,
      sort,
      minLength,
      minStars,
    });
    const trails = await findTrailsNear(coordinate, options);
    console.log(process.env.HIKING_PROJECT_KEY);
    return res.json({
      trails,
    });
  } catch (e) {
    console.warn(e);
    res.sendStatus(400);
  }
});

router.get('/zip', async function (req, res) {
  try {
    var zip = 48207;
    const latLon = await ziptoLatLon(zip);
    const coordinate = new Coordinate(latLon.lat, latLon.lng);
    console.log(coordinate);
    return res.json(latLon);
  } catch (e) {
    console.warn(e);
    res.sendStatus(400);
  }
});

export const trailsRouter = router;
