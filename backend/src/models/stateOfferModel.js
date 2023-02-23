const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM state_offer")
    .then(([states]) => states);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM state_offer where id = ?", [id])
    .then(([state]) => state);
};

module.exports = { findAll, findOne };
