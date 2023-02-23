const express = require("express");

const alertRouter = express.Router();

const alertController = require("../controllers/alertController");

alertRouter.post("/", alertController.postAlert);
alertRouter.get("/:id", alertController.getAlerts);
alertRouter.delete("/:id", alertController.deleteAlert);

module.exports = alertRouter;
