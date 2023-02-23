const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM experience")
    .then((experiences) => experiences);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM experience where id = ?", [id])
    .then(([experience]) => experience);
};

module.exports = { findAll, findOne };
