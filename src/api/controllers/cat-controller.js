import {
  addCat,
  findCatById,
  listAllCats,
  findCatByOwnerId,
} from '../models/cat-model.js';
import {createThumbnail} from '../../middleware.js';

const getCats = async (req, res) => {
  const cats = await listAllCats();
  res.status(200).json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.status(200).json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatByUserId = async (req, res) => {
  const cats = await findCatByOwnerId(req.params.id);
  if (cats) {
    res.status(200).json(cats);
  } else {
    res.sendStatus(404);
  }
};

const getOwnerIdByCatId = async (catId) => {
  const cat = await findCatById(catId);
  return cat.owner ?? null;
};

const postCat = (req, res) => {
  const catData = {
    ...req.body,
    filename: req.file.filename,
  };
  createThumbnail(req, res, async () => {
    const result = await addCat(catData);
    if (result.cat_id) {
      res.status(201);
      res.json({message: 'New cat added.', result});
    } else {
      res.sendStatus(400);
    }
  });
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id, res.locals.user);
  if (result.message === 'success') {
    res.status(200);
    res.send({message: 'Cat item updated.'});
  } else {
    res.status(403);
    res.send({message: 'User is not the owner of the resource'});
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id, res.locals.user);
  if (result.message === 'success') {
    res.status(200);
    res.send({message: 'Cat item deleted.'});
  } else {
    res.status(403);
    res.send({message: 'User is not the owner of the resource'});
  }
};

export {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatByUserId,
  getOwnerIdByCatId,
};
