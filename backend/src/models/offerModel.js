const db = require("../../config");

const findAll = (where) => {
  const initSql =
    "SELECT * FROM offer JOIN job ON offer.job_id = job.id JOIN firm ON offer.firm_id = firm.id JOIN experience ON offer.experience_id = experience.id ";
  if (where.length > 0) {
    return db
      .promise()
      .query(`${initSql} WHERE ${where.join(" AND ")}`)
      .then((offers) => offers);
  }
  return db
    .promise()
    .query(
      "SELECT * FROM offer JOIN job ON offer.job_id = job.id JOIN firm ON offer.firm_id = firm.id JOIN experience ON offer.experience_id = experience.id "
    )
    .then((offers) => offers);
};

const findOne = (id) => {
  return db
    .promise()
    .query(
      "SELECT *, offer.id FROM offer JOIN job ON offer.job_id = job.id JOIN firm ON offer.firm_id = firm.id JOIN experience ON offer.experience_id = experience.id WHERE offer.id = ?",
      [id]
    )
    .then(([offer]) => offer);
};
const findAllCities = () => {
  return db
    .promise()
    .query("SELECT DISTINCT firm_city FROM offer")
    .then((cities) => cities);
};

const findOffersByCity = (city) => {
  return db
    .promise()
    .query("SELECT * FROM offer where firm_city = ?", [city])
    .then(([offers]) => offers);
};
const findOffersByState = (where, limit) => {
  const initialSql =
    "SELECT offer.id, firm.name, offer.title, offer.date, offer.firm_city, firm.logo_url  FROM offer JOIN job ON offer.job_id = job.id JOIN firm ON offer.firm_id = firm.id JOIN experience ON offer.experience_id = experience.id ";
  const states = where.map(({ value }) => value);
  states.push(Number(limit));
  return db
    .promise()
    .query(
      `${where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ? `,

        initialSql
      )} LIMIT  ?`,

      states
    )
    .then(([offers]) => offers);
};
const findAllOffersByFirm = (id) => {
  return db
    .promise()
    .query(
      "SELECT offer.id, firm.name, offer.title, offer.date, offer.firm_city, firm.logo_url  FROM offer JOIN job ON offer.job_id = job.id JOIN firm ON offer.firm_id = firm.id WHERE firm.id = ? ORDER BY offer.date DESC",
      [id]
    );
};
const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM offer WHERE id = ?", [id])
    .then(([offer]) => offer);
};
const createOne = (offer) => {
  return db
    .promise()
    .query("INSERT INTO offer SET ?", [offer])
    .then((result) => result);
};

const updateOne = (offer, id) => {
  return db
    .promise()
    .query("UPDATE offer SET ? WHERE id = ?", [offer, id])
    .then((res) => res);
};
const findOnlyOfferInfos = (id) => {
  return db
    .promise()
    .query(
      "SELECT title, firm_id, firm_city, salary, description_firm, description_mission, soft_skills, hard_skills, experience_id  FROM offer WHERE offer.id = ?",
      [id]
    )
    .then(([offer]) => offer);
};

module.exports = {
  findAll,
  findOne,
  findAllCities,
  findOffersByCity,
  findOffersByState,
  findAllOffersByFirm,
  deleteOne,
  createOne,
  updateOne,
  findOnlyOfferInfos,
};
