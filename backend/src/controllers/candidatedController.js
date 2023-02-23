/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const candidatedModel = require("../models/candidatedModel");

const candidatedController = {
  getAllcandidateds: (req, res, next) => {
    candidatedModel
      .findAll()
      .then((candidateds) => res.status(200).send(candidateds))
      .catch((err) => next(err));
  },
  getcandidatedById: (req, res, next) => {
    const { id } = req.params;
    candidatedModel
      .findOne(id)
      .then(([candidated]) => res.status(200).send(candidated))
      .catch((err) => next(err));
  },
  getCandidatedByUser: (req, res, next) => {
    const { offer_id } = req.query;
    const { user_id } = req.query;
    candidatedModel
      .findOneByUser(user_id, offer_id)
      .then(([candidated]) => res.status(200).send(candidated))
      .catch((err) => next(err));
  },
  postCandidated: (req, res, next) => {
    const { user_id, offer_id } = req.body;
    const application_state_id = 1;
    candidatedModel
      .createOne({ user_id, offer_id, application_state_id })
      .then((candidated) => res.status(200).send(candidated))
      .catch((err) => next(err));
  },
  putCandidated: (req, res, next) => {
    const { id } = req.params;
    const { application_state_id } = req.body;
    candidatedModel
      .updateOne(id, { application_state_id })
      .then((candidated) => res.status(200).send(candidated))
      .catch((err) => next(err));
  },
  deleteCandidated: (req, res, next) => {
    const { id } = req.params;
    candidatedModel
      .deleteOne(id)
      .then((candidated) => res.status(200).send(candidated))
      .catch((err) => next(err));
  },
  getCandidatedsByUser: (req, res, next) => {
    const { user_id } = req.params;
    candidatedModel
      .findAllByUser(user_id)
      .then((candidateds) => res.status(200).send(candidateds))
      .catch((err) => next(err));
  },
};

module.exports = candidatedController;
