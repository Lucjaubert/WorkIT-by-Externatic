const express = require("express");

const spontaneousApplicationRouter = express.Router();

// eslint-disable-next-line import/no-unresolved, import/extensions
const spontaneousApplicationController = require("../controllers/spontaneousApplicationController");

spontaneousApplicationRouter.get(
  "/",
  spontaneousApplicationController.getAllSpontaneousApplication
);

module.exports = spontaneousApplicationRouter;
