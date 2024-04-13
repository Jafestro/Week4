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

const getUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  if (rows.length > 0) {
    return {
      user_id: rows[0].user_id,
      name: rows[0].name,
      username: rows[0].username,
      email: rows[0].email,
      password: rows[0].password,
      role: rows[0].role,
    };
  } else {
    return null;
  }
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const [rows] = await promisePool.execute(
    'INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [name, username, email, password, role]
  );
  return {user_id: rows.insertId};
};

const updateUser = async (user, id, reqUser) => {
  let sql;
  if (reqUser.role === 'admin') {
    sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
      user,
      id,
    ]);
  } else {
    sql = promisePool.format(
      `UPDATE wsk_users SET ? WHERE user_id = ? AND user_id = ?`,
      [user, id, reqUser.user_id]
    );
  }
  const rows = await promisePool.execute(sql);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const deleteUser = async (id, reqUser) => {
  let sql;
  if (reqUser.role === 'admin') {
    sql = promisePool.format('DELETE FROM wsk_users WHERE user_id = ?', [id]);
  } else {
    sql = promisePool.format(
      'DELETE FROM wsk_users WHERE user_id = ? AND user_id = ?',
      [id, reqUser.user_id]
    );
  }
  const [rows] = await promisePool.execute(sql);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
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
  getUserByUsername,
};
