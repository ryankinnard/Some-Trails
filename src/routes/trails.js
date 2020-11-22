import express from 'express';
import { Coordinate } from '../models';
import { findTrailsNear, HikingProjectOptions } from '../controllers';
import { findDistanceToTrail } from '../controllers';
import { ziptoLatLon } from '../controllers';

const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const {
      location,
      maxDistance,
      maxResults,
      sort,
      minLength,
      minStars,
    } = req.query;
    const latLon = await ziptoLatLon(req.query.location);
    const coordinate = new Coordinate(latLon.lat, latLon.lng);
    const options = new HikingProjectOptions({
      maxDistance,
      maxResults,
      sort,
      minLength,
      minStars,
    });
    const trails = await findTrailsNear(coordinate, options);

    return res.json({
      trails,
    });
  } catch (e) {
    console.warn(e);
    res.sendStatus(400);
  }
});

export const trailsRouter = router;
