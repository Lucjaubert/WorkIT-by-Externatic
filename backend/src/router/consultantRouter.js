const express = require("express");

const consultantRouter = express.Router();

const consultantController = require("../controllers/consultantController");

consultantRouter.post("/login", consultantController.login);
consultantRouter.get("/", consultantController.getAllConsultants);
consultantRouter.get("/:id", consultantController.getConsultantById);
consultantRouter.post("/createprofile", consultantController.createConsultant);
consultantRouter.delete("/:id", consultantController.deleteConsultant);

module.exports = consultantRouter;
