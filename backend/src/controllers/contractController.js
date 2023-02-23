const contractModel = require("../models/contractModel");

const contractController = {
  getAllContracts: (req, res, next) => {
    contractModel
      .findAll()
      .then((contracts) => res.status(200).send(contracts))
      .catch((err) => next(err));
  },
  getContractById: (req, res, next) => {
    const { id } = req.params;
    contractModel
      .findOne(id)
      .then(([contract]) => res.status(200).send(contract))
      .catch((err) => next(err));
  },
};

module.exports = contractController;
