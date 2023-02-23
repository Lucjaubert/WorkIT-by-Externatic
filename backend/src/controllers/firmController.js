const firmModel = require("../models/firmModel");

const firmController = {
  getAllFirms: (req, res, next) => {
    firmModel
      .findAll()
      .then((firms) => res.status(200).send(firms))
      .catch((err) => next(err));
  },
  getFirmById: (req, res, next) => {
    const { id } = req.params;
    firmModel
      .findOne(id)
      .then(([firm]) => res.status(200).send(firm))
      .catch((err) => next(err));
  },
  getFirmOffer: (req, res, next) => {
    firmModel
      .findOfferByFirm()
      .then((firmOffers) => res.status(200).send(firmOffers))
      .catch((err) => next(err));
  },
  createFirm: (req, res, next) => {
    const firm = req.body;
    firmModel
      .createFirm(firm)
      .then((reponse) => res.status(200).send(reponse))
      .catch((err) => next(err));
  },

  deleteFirm: (req, res, next) => {
    const { id } = req.params;
    firmModel
      .deleteFirm(id)
      .then(() => res.status(200).send("deleted"))
      .catch((err) => next(err));
  },

  updateFirm: (req, res, next) => {
    const { id } = req.params;
    const firm = req.body;
    firmModel
      .updateFirm(firm, id)
      .then(() => res.status(200).send("Updated"))
      .catch((err) => next(err));
  },
};

module.exports = firmController;
