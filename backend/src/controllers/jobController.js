const jobModel = require("../models/jobModel");

const jobController = {
  getAllJobs: (req, res, next) => {
    jobModel
      .findAll()
      .then(([jobs]) => res.status(200).send(jobs))
      .catch((err) => next(err));
  },
  getJobById: (req, res, next) => {
    const { id } = req.params;
    jobModel
      .findOne(id)
      .then(([job]) => res.status(200).send(job))
      .catch((err) => next(err));
  },
  getAllTitles: (req, res, next) => {
    jobModel
      .findAllTitles()
      .then(([jobs]) => res.status(200).send(jobs))
      .catch((err) => next(err));
  },
  getJobByTitle: (req, res, next) => {
    const { title } = req.params;
    jobModel
      .findByTitle(title)
      .then(([job]) => res.status(200).send(job))
      .catch((err) => next(err));
  },
};

module.exports = jobController;
