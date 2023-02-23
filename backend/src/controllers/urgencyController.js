const urgencyModel = require("../models/urgencyModel");

const urgencyController = {
  getAllUrgencies: (req, res, next) => {
    urgencyModel
      .findAll()
      .then((urgencies) => res.status(200).send(urgencies))
      .catch((err) => next(err));
  },
  getUrgencyById: (req, res, next) => {
    const { id } = req.params;
    urgencyModel
      .findOne(id)
      .then(([urgency]) => res.status(200).send(urgency))
      .catch((err) => next(err));
  },
};

module.exports = urgencyController;
