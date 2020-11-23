import express from 'express';
import { DifficultyLevel, User } from '../models';
import * as users from '../controllers/users';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('newUser');
});

router.post('/', function (req, res) {
  console.log(req.body);

  const newUser = new User(
    0,
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.displayName,
    parseDifficulty(
      (parseInt(req.body.q1) +
        parseInt(req.body.q2) +
        parseInt(req.body.q3) +
        parseInt(req.body.q4) +
        parseInt(req.body.q5)) /
        6,
    ),
  );

  console.log(newUser);

  users.pushUser(newUser);
  res.render('home', { user: 0 });
});

function parseDifficulty(dl) {
  switch (dl) {
    case dl < 1:
      return DifficultyLevel.GREEN;
    case dl < 2:
      return DifficultyLevel.GREENBLUE;
    case dl < 3:
      return DifficultyLevel.BLUE;
    case dl < 4:
      return DifficultyLevel.BLUEBLACK;
    case dl < 5:
      return DifficultyLevel.BLACK;
    default:
      return DifficultyLevel.BLACKBLACK;
  }
}

export const newUserRouter = router;
