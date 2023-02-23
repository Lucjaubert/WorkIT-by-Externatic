const express = require("express");

const urgencyRouter = express.Router();

const urgencyController = require("../controllers/urgencyController");

urgencyRouter.get("/", urgencyController.getAllUrgencies);
urgencyRouter.get("/:id", urgencyController.getUrgencyById);

module.exports = urgencyRouter;
