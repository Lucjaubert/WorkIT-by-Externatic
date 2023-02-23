const userAlertModel = require("../models/userAlertModel");

const userAlertController = {
  getAllUserId(req, res, next) {
    // eslint-disable-next-line camelcase
    const { job_id } = req.query;
    const { city } = req.query;

    userAlertModel
      .findAllUserId(job_id, city)
      .then((users) => res.status(200).send(users))
      .catch((err) => next(err));
  },
  createUserAlert(req, res, next) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.body;
    // eslint-disable-next-line camelcase
    const { job_id } = req.body;
    const { city } = req.body;

    userAlertModel
      .createUserAlert(user_id, job_id, city)
      .then((users) => res.status(200).send(users))
      .catch((err) => next(err));
  },
  deleteUserAlert(req, res, next) {
    const { id } = req.params;
    userAlertModel
      .deleteUserAlert(id)
      .then((users) => res.status(200).send(users))
      .catch((err) => next(err));
  },
  modifyUserAlert(req, res, next) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.body;
    // eslint-disable-next-line camelcase
    const { job_id } = req.body;
    const { city } = req.body;
    // eslint-disable-next-line camelcase
    const { userAlert_id } = req.params;
    userAlertModel
      .modifyUserAlert(user_id, job_id, city, userAlert_id)
      .then((users) => res.status(200).send(users))
      .catch((err) => next(err));
  },

  findUserAlert(req, res, next) {
    const { id } = req.params;
    userAlertModel
      .findUserAlert(id)
      .then((users) => res.status(200).send(users))
      .catch((err) => next(err));
  },
};

module.exports = userAlertController;
