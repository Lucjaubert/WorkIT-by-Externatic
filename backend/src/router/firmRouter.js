const express = require("express");

const firmRouter = express.Router();
const firmController = require("../controllers/firmController");

firmRouter.get("/", firmController.getAllFirms);
firmRouter.get("/offer", firmController.getFirmOffer);
firmRouter.post("/createFirm", firmController.createFirm);
firmRouter.get("/:id", firmController.getFirmById);
firmRouter.delete("/deleteFirm/:id", firmController.deleteFirm);
firmRouter.put("/updateFirm/:id", firmController.updateFirm);

module.exports = firmRouter;
