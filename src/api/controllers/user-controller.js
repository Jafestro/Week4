import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser as deleteUserModel,
  getCatsByUserId,
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  res.json(await getAllUsers());
};

const getUser = async (req, res) => {
  res.json(await getUserById(req.params.id));
};

const postUser = async (req, res) => {
  res.json(await addUser(req.body));
};

const putUser = async (req, res) => {
  res.json(await updateUser(req.body, req.params.id));
};

const deleteUser = async (req, res) => {
  res.json(await deleteUserModel(req.params.id));
};

const getUserCats = async (req, res) => {
  res.json(await getCatsByUserId(req.params.id));
};

export {getUsers, getUser, postUser, putUser, deleteUser, getUserCats};
