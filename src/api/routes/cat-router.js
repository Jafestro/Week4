import express from 'express';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();

router.route('/').get(getCats).post(postCat);

router.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default router;
