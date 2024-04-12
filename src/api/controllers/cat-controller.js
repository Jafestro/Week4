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
  // not implemented in this example, this is future homework
  res.status(200);
  res.send({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.send({message: 'Cat item deleted.'});
};

export {getCats, getCatById, postCat, putCat, deleteCat, getCatByUserId};
