const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query(`SELECT * FROM gender;`)
    .then((gender) => gender);
};

module.exports = { findAll };
