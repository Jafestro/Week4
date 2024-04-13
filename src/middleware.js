import sharp from 'sharp';
import path from 'path';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {getOwnerIdByCatId} from './api/controllers/cat-controller.js';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const filePath = req.file.path;
  const directory = path.dirname(filePath);
  const filename = path.basename(filePath, path.extname(filePath));
  const thumbnailPath = path.join(directory, `${filename}_thumb.png`);

  try {
    await sharp(filePath).resize(160, 160).png().toFile(thumbnailPath);

    console.log(`Thumbnail created at ${thumbnailPath}`);
  } catch (error) {
    console.error(`Failed to create thumbnail: ${error}`);
  }

  next();
};

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

const checkOwnership = async (req, res, next) => {
  const user = res.locals.user;
  if (!user) {
    return res.sendStatus(401);
  }

  const resourceId = req.params.id;
  console.log(resourceId);
  const ownerId = await getOwnerIdByCatId(resourceId);
  console.log(ownerId);

  if (user.user_id !== ownerId) {
    console.log('User is not the owner of the resource');
    return res
      .status(403)
      .send({message: 'User is not the owner of the resource'});
  }

  next();
};

export {authenticateToken, createThumbnail, checkOwnership};
