import express from 'express';
import { User } from '../models';
import * as users from '../controllers/users';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('newUser');
});

router.post('/', function (req, res) {
  const newUser = new User(
    2,
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.displayName,
    3,
  );

  users.pushUser(newUser);
  res.render('home', { user: newUser });
});

export const newUserRouter = router;
