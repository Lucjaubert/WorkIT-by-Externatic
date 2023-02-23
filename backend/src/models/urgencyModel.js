const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM urgence")
    .then(([urgencies]) => urgencies);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM urgence where id = ?", [id])
    .then(([urgency]) => urgency);
};

module.exports = { findAll, findOne };
