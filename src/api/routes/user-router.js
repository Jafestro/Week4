import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const router = express.Router();

router.route('/').get(getUsers).post(postUser);

router.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default router;
