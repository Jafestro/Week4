import express from 'express';
import multer from 'multer';

import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.route('/').get(getCats);
router.route('/').post(upload.single('filename'), postCat);

router.route('/:id').get(getCatById).put(putCat).delete(deleteCat);
export default router;
