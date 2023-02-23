const db = require("../../config");

const findAll = (id) => {
  return db
    .promise()
    .query(
      "SELECT alert_id, offer_id, title, firm_id, date, logo_url, firm_city, name  FROM alert JOIN offer ON alert.offer_id = offer.id JOIN firm ON offer.firm_id = firm.id WHERE alert.user_id = ?",
      [id]
    )
    .then(([alert]) => alert);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM alert where id = ?", [id])
    .then(([alert]) => alert);
};

const create = (alert) => {
  return (
    db
      .promise()
      .query("INSERT INTO alert SET ?", [alert])
      // eslint-disable-next-line no-shadow
      .then((alert) => alert)
  );
};

const deleteAlert = (id) => {
  return db
    .promise()
    .query("DELETE FROM alert WHERE alert_id = ?", [id])
    .then((alert) => alert);
};

module.exports = { findAll, findOne, create, deleteAlert };
