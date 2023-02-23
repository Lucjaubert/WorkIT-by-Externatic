/* eslint-disable camelcase */
const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM favorite")
    .then(([favorites]) => favorites);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM favorite where id = ?", [id])
    .then(([favorite]) => favorite);
};
const findOneByUser = (user_id, offer_id) => {
  return db
    .promise()
    .query("SELECT * FROM favorite where user_id = ? and offer_id = ?", [
      user_id,
      offer_id,
    ])
    .then(([favorite]) => favorite);
};
const createOne = (payload) => {
  return db
    .promise()
    .query("INSERT INTO favorite SET ?", [payload])
    .then((favorite) => favorite);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE from favorite WHERE favorite_id = ?", [id])
    .then((favorite) => favorite);
};

const findAllByUser = (user_id) => {
  return db
    .promise()
    .query(
      "SELECT offer.id, firm.name, offer.title, offer.date, firm_city, firm.logo_url  FROM offer JOIN job ON offer.job_id = job.id JOIN firm ON offer.firm_id = firm.id JOIN favorite ON favorite.offer_id = offer.id where user_id = ?",
      [user_id]
    )
    .then(([favorites]) => favorites);
};
module.exports = {
  findAll,
  findOne,
  findOneByUser,
  createOne,
  deleteOne,
  findAllByUser,
};
