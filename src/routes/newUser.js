import express from 'express';
import { User, getDifficultyIconPath } from '../models';
import * as users from '../controllers/users';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('home', { user: req.user, showNewUserModal: true });
});

router.post('/', function (req, res) {
  const { username, password, email, displayName } = req.body;
  const newUser = new User({
    id: users.length,
    username,
    password,
    email,
    displayName,
    difficultyLevel: diccuparseDifficulty(
      (parseInt(req.body.q1) +
        parseInt(req.body.q2) +
        parseInt(req.body.q3) +
        parseInt(req.body.q4) +
        parseInt(req.body.q5)) /
        6,
    ),
  });
  newUser.id = users.pushUserAndSetID(newUser);
  req.session.user = newUser;
  req.session.diffIcon = getDifficultyIconPath(newUser.difficultyLevel);
  res.redirect('/profile');
});

export const newUserRouter = router;
