/* eslint-disable camelcase */
const alertModel = require("../models/alertModel");

const alertController = {
  postAlert: (req, res, next) => {
    const { user_id, offer_id } = req.body;
    alertModel
      .create({ user_id, offer_id })
      .then((alert) => res.status(200).send(alert))
      .catch((err) => next(err));
  },
  getAlerts: (req, res, next) => {
    const { id } = req.params;
    alertModel
      .findAll(id)
      .then((alerts) => res.status(200).send(alerts))
      .catch((err) => next(err));
  },
  deleteAlert: (req, res, next) => {
    const { id } = req.params;
    alertModel
      .deleteAlert(id)
      .then((alert) => res.status(200).send(alert))
      .catch((err) => next(err));
  },
};

module.exports = alertController;
