const express = require("express");

const experienceRouter = express.Router();

const experienceController = require("../controllers/experienceController");

experienceRouter.get("/", experienceController.getAllExperiences);
experienceRouter.get("/:id", experienceController.getExperienceById);

module.exports = experienceRouter;
