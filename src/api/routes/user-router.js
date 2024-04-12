import express from 'express';
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  getUserCats,
} from '../controllers/user-controller.js';

const router = express.Router();

router.route('/').get(getUsers).post(postUser);

router.route('/:id').get(getUser).put(putUser).delete(deleteUser);

router.route('/:id/cats').get(getUserCats);

export default router;
