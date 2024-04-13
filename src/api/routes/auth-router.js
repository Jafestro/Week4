'use strict';
import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middleware.js';

const router = express.Router();

router.route('/login').post(postLogin);
router.route('/me').get(authenticateToken, getMe);

export default router;
