const express = require("express");

const stateOfferRouter = express.Router();

const stateOfferController = require("../controllers/stateOfferController");

stateOfferRouter.get("/", stateOfferController.getAllStates);
stateOfferRouter.get("/:id", stateOfferController.getStateById);

module.exports = stateOfferRouter;
