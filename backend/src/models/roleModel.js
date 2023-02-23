const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM role")
    .then((roles) => roles);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM role where id = ?", [id])
    .then(([role]) => role);
};

module.exports = { findAll, findOne };
