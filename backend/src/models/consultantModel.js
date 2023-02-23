/* eslint-disable camelcase */
const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM consultant")
    .then((consultants) => consultants);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM consultant where id = ?", [id])
    .then(([consultant]) => consultant);
};

const create = (payload) => {
  return db
    .promise()
    .query("INSERT INTO consultant SET ?", [payload])
    .then((consultant) => consultant);
};
const findByEmail = (email) => {
  return db
    .promise()
    .query("SELECT * FROM consultant WHERE email = ?", [email])
    .then(([res]) => res);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE from consultant WHERE id = ?", [id])
    .then((res) => res);
};

module.exports = { findAll, findOne, create, findByEmail, deleteOne };
