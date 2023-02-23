const stateOfferModel = require("../models/stateOfferModel");

const stateOfferController = {
  getAllStates: (req, res, next) => {
    stateOfferModel
      .findAll()
      .then((states) => res.status(200).send(states))
      .catch((err) => next(err));
  },
  getStateById: (req, res, next) => {
    const { id } = req.params;
    stateOfferModel
      .findOne(id)
      .then(([state]) => res.status(200).send(state))
      .catch((err) => next(err));
  },
};

module.exports = stateOfferController;
