const express = require("express");

const contractRouter = express.Router();

const contractController = require("../controllers/contractController");

contractRouter.get("/", contractController.getAllContracts);
contractRouter.get("/:id", contractController.getContractById);

module.exports = contractRouter;
