/* eslint-disable camelcase */
const db = require("../../config");

const findAll = (where) => {
  const initSql = "SELECT * FROM user JOIN job ON user.job_id = job.id";
  if (where.length > 0) {
    return db
      .promise()
      .query(`${initSql} WHERE ${where.join(" AND ")}`)
      .then((users) => users);
  }
  return db
    .promise()
    .query(
      "SELECT * FROM user JOIN job ON user.job_id = job.id ORDER by consultant_id ASC"
    )
    .then((users) => users);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM user where id = ?", [id])
    .then(([user]) => user);
};
const findByEmail = (email) => {
  return db
    .promise()
    .query("SELECT * FROM user where email = ?", [email])
    .then(([user]) => user);
};

const createOne = (payload) => {
  return db
    .promise()
    .query("INSERT INTO user SET ?", [payload])
    .then((user) => user);
};

const updateOne = (payload, id) => {
  return db
    .promise()
    .query("UPDATE user SET ? WHERE id = ?", [payload, Number(id)])
    .then(([res]) => res);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM user WHERE id = ?", [Number(id)])
    .then(([res]) => res);
};

const updateCv = (url, id) => {
  return db
    .promise()
    .query("UPDATE user SET file = ? WHERE id = ?", [url, Number(id)])
    .then(([res]) => res);
};

const updateImage = (url, id) => {
  return db
    .promise()
    .query("UPDATE user SET photo = ? WHERE id = ?", [url, Number(id)])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  findOne,
  findByEmail,
  createOne,
  updateOne,
  deleteOne,
  updateCv,
  updateImage,
};
