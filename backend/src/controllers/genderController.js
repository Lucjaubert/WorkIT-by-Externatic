const genderModel = require("../models/genderModel");

const genderController = {
  getAllGenders: (_, res, next) => {
    genderModel
      .findAll()
      .then(([gender]) => res.status(200).send(gender))
      .catch((err) => next(err));
  },
};

module.exports = genderController;
