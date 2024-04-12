import {addCat, findCatById, listAllCats} from '../models/cat-model.js';
import {createThumbnail} from '../../middleware.js';

const getCats = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const catData = {
    ...req.body,
    filename: req.file.filename,
  };
  createThumbnail(req, res, () => {
    const result = addCat(catData);
    if (result.cat_id) {
      res.status(201);
      res.json({message: 'New cat added.', result});
    } else {
      res.sendStatus(400);
    }
  });
};

const putCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.send({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.status(200);
  res.send({message: 'Cat item deleted.'});
};

export {getCats, getCatById, postCat, putCat, deleteCat};
