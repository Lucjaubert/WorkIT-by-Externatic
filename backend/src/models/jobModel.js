const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM job ORDER BY job_title")
    .then((jobs) => jobs);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM job where id = ?", [id])
    .then(([job]) => job);
};

const findAllTitles = () => {
  return db
    .promise()
    .query("SELECT job_title FROM job")
    .then((jobs) => jobs);
};

const findByTitle = (title) => {
  return db
    .promise()
    .query("SELECT id FROM job where job_title = ?", [title])
    .then(([jobs]) => jobs);
};

module.exports = { findAll, findOne, findAllTitles, findByTitle };
