const roleModel = require("../models/roleModel");

const roleController = {
  getAllRoles: (req, res, next) => {
    roleModel
      .findAll()
      .then((roles) => res.status(200).send(roles))
      .catch((err) => next(err));
  },
  getRoleById: (req, res, next) => {
    const { id } = req.params;
    roleModel
      .findOne(id)
      .then(([role]) => res.status(200).send(role))
      .catch((err) => next(err));
  },
};

module.exports = roleController;
