import express from 'express';
import multer from 'multer';

import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatByUserId,
} from '../controllers/cat-controller.js';
import {getCatsByUserId} from '../models/user-model.js';

const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.route('/').get(getCats);
router.route('/').post(upload.single('filename'), postCat);

router.route('/:id').get(getCatById).put(putCat).delete(deleteCat);
router.route('/user_id/:id').get(getCatByUserId);
export default router;
