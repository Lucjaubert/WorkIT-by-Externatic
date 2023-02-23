const express = require("express");

const userAlertRouter = express.Router();

const userAlertController = require("../controllers/userAlertController");

userAlertRouter.get("/", userAlertController.getAllUserId);
userAlertRouter.post("/create/", userAlertController.createUserAlert);
userAlertRouter.delete("/delete/:id", userAlertController.deleteUserAlert);
userAlertRouter.put("/modify", userAlertController.modifyUserAlert);
userAlertRouter.get("/myUserAlerts/:id", userAlertController.findUserAlert);

module.exports = userAlertRouter;
