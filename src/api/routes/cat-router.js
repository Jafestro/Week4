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
import {authenticateToken, checkOwnership} from '../../middleware.js';

const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.route('/').get(getCats);
router.route('/').post(upload.single('filename'), postCat);

router.route('/:id').get(getCatById);
router
  .route('/:id')
  .put(authenticateToken, checkOwnership, putCat)
  .delete(authenticateToken, checkOwnership, deleteCat);

router.route('/user_id/:id').get(getCatByUserId);
export default router;
