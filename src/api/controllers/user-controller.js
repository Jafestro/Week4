import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser as deleteUserModel,
  getCatsByUserId,
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  res.json(await getAllUsers());
};

const getUser = async (req, res) => {
  res.json(await getUserById(req.params.id));
};

const postUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  res.json(await addUser(req.body));
};

const putUser = async (req, res) => {
  const result = await updateUser(req.body, req.params.id, res.locals.user);
  if (result.message === 'success') {
    res.status(200);
    res.send({message: 'User updated.'});
  } else {
    res.status(403);
    res.send({message: 'User is not the owner of the resource'});
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserModel(req.params.id, res.locals.user);
  if (result.message === 'success') {
    res.status(200);
    res.send({message: 'User deleted.'});
  } else {
    res.status(403);
    res.send({message: 'User is not the owner of the resource'});
  }
};

const getUserCats = async (req, res) => {
  res.json(await getCatsByUserId(req.params.id));
};

export {getUsers, getUser, postUser, putUser, deleteUser, getUserCats};
