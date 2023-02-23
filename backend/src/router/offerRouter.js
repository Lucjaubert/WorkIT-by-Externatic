const express = require("express");

const offerRouter = express.Router();

const offerController = require("../controllers/offerController");

offerRouter.get("/", offerController.getAllOffers);
offerRouter.get("/cities", offerController.getAllCities);
offerRouter.get("/state/", offerController.getOffersByState);
offerRouter.get("/:id", offerController.getOfferById);
offerRouter.get("/firm/:id", offerController.getAllOffersByFirm);
offerRouter.get("/city/:city", offerController.getOffersByCity);
offerRouter.delete("/:id", offerController.deleteOfferById);
offerRouter.post("/create", offerController.createOffer);
offerRouter.put("/update/:id", offerController.updateOffer);
offerRouter.get("/onlyOffer/:id", offerController.loadOnlyOfferInfos);

module.exports = offerRouter;
