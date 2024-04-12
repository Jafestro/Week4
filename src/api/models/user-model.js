import promisePool from '../../utils/database.js';

const getAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows[0];
};

const addUser = async (user) => {
  const [rows] = await promisePool.execute('INSERT INTO wsk_users SET ?', [
    user,
  ]);
  return {user_id: rows.insertId};
};

const updateUser = async (user, id) => {
  const [rows] = await promisePool.execute(
    'UPDATE wsk_users SET ? WHERE user_id = ?',
    [user, id]
  );
  return rows.affectedRows !== 0;
};

const deleteUser = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_users WHERE user_id = ?',
    [id]
  );
  return rows.affectedRows !== 0;
};

const getCatsByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [id]
  );
  return rows;
};

export {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getCatsByUserId,
};
