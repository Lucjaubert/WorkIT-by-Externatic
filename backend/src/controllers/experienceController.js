const experienceModel = require("../models/experienceModel");

const experienceController = {
  getAllExperiences: (req, res, next) => {
    experienceModel
      .findAll()
      .then(([experiences]) => res.status(200).send(experiences))
      .catch((err) => next(err));
  },
  getExperienceById: (req, res, next) => {
    const { id } = req.params;
    experienceModel
      .findOne(id)
      .then(([experience]) => res.status(200).send(experience))
      .catch((err) => next(err));
  },
};

module.exports = experienceController;
