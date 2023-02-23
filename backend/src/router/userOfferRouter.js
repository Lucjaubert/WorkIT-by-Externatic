const express = require("express");

const userOfferRouter = express.Router();

const userOfferController = require("../controllers/userOfferController");

userOfferRouter.get("/", userOfferController.getAlluserOffers);
userOfferRouter.get("/:id", userOfferController.getuserOfferById);
userOfferRouter.post("/post", userOfferController.createUserOffer);

module.exports = userOfferRouter;
