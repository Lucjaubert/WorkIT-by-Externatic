const db = require("../../config");

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM firm")
    .then(([firms]) => firms);
};

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM firm where id = ?", [id])
    .then(([firm]) => firm);
};

const findOfferByFirm = () => {
  return db
    .promise()
    .query(
      "select firm.id as firm_id, name, contact_phone, email, city, coalesce(count(offer.id), 0) as nbreoffers from firm left join offer on firm.id = offer.firm_id group by firm.id, name, contact_phone, email, city"
    )
    .then(([firmOffers]) => firmOffers);
};

const createFirm = (firm) => {
  return db
    .promise()
    .query("INSERT INTO firm SET ?", [firm])
    .then(([reponse]) => reponse);
};

const deleteFirm = (id) => {
  return db
    .promise()
    .query("DELETE from firm WHERE id = ?", [id])
    .then((res) => res);
};

const updateFirm = (firm, id) => {
  return db
    .promise()
    .query("UPDATE firm SET ? WHERE id = ?", [firm, Number(id)])
    .then((res) => res);
};

module.exports = {
  findAll,
  findOne,
  findOfferByFirm,
  createFirm,
  deleteFirm,
  updateFirm,
};
