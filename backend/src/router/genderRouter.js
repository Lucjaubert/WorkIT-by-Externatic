const express = require("express");

const genderRouter = express.Router();

const genderController = require("../controllers/genderController");

genderRouter.get("/", genderController.getAllGenders);

module.exports = genderRouter;
