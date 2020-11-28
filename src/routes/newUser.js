import express from 'express';
import { User, parseDifficultyFromNum, getDifficultyIconPath } from '../models';
import * as users from '../controllers/users';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('home', { user: req.user, showNewUserModal: true });
});

router.post('/newuser', function (req, res) {
  const newUserDifficulty = parseDifficultyFromNum(
    (parseInt(req.body.q1) +
      parseInt(req.body.q2) +
      parseInt(req.body.q3) +
      parseInt(req.body.q4) +
      parseInt(req.body.q5)) /
      6,
  );

  var newUser = new User(
    0,
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.displayName,
    newUserDifficulty,
  );

  newUser.id = users.pushUserAndSetID(newUser);
  req.session.user = newUser;
  req.session.diffIcon = getDifficultyIconPath(newUser.difficultyLevel);
  res.redirect('/profile');
});

export const newUserRouter = router;
