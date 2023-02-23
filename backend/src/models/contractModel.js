const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM contract")
    .then(([contracts]) => contracts);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM contract where id = ?", [id])
    .then(([contract]) => contract);
};

module.exports = { findAll, findOne };
