// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    'SELECT wsk_cats.*, wsk_users.name as owner_name FROM wsk_cats JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id'
  );
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findCatByOwnerId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, id, user) => {
  let sql;
  if (user.role === 'admin') {
    sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
      cat,
      id,
    ]);
  } else {
    sql = promisePool.format(
      `UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`,
      [cat, id, user.user_id]
    );
  }
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id, user) => {
  let sql;
  if (user.role === 'admin') {
    sql = promisePool.format('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  } else {
    sql = promisePool.format(
      'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?',
      [id, user.user_id]
    );
  }
  const [rows] = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
  findCatByOwnerId,
};
