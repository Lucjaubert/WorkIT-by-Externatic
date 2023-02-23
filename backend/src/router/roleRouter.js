const express = require("express");

const roleRouter = express.Router();

const roleController = require("../controllers/roleController");

roleRouter.get("/", roleController.getAllRoles);
roleRouter.get("/:id", roleController.getRoleById);

module.exports = roleRouter;
