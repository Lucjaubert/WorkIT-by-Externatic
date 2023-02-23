const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM admin")
    .then((admin) => admin);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM admin where id = ?", [id])
    .then(([admin]) => admin);
};

const findByEmail = (email) => {
  return db
    .promise()
    .query("SELECT * FROM admin where email = ?", [email])
    .then(([admin]) => admin);
};

module.exports = { findAll, findOne, findByEmail };
