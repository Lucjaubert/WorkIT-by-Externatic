/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const userOfferModel = require("../models/userOfferModel");

const userOfferController = {
  getAlluserOffers: (req, res, next) => {
    userOfferModel
      .findAll()
      .then(([userOffers]) => res.status(200).send(userOffers))
      .catch((err) => next(err));
  },
  getuserOfferById: (req, res, next) => {
    const { id } = req.params;
    userOfferModel
      .findOne(id)
      .then(([userOffer]) => res.status(200).send(userOffer))
      .catch((err) => next(err));
  },

  createUserOffer: (req, res, next) => {
    const { user_id, offer_id, isFavorite, candidated } = req.body;
    userOfferModel
      .createOne({
        user_id,
        offer_id,
        isFavorite,
        candidated,
      })
      .then(([response]) => {
        console.warn(response);
        return res.status(201).send({
          message: "userOffer created successfully",
          user_id,
          offer_id,
          isFavorite,
          candidated,
        });
      })
      .catch((err) => next(err));
  },
  getUserOfferByOfferAndUser: (req, res, next) => {
    const { offer_id, user_id } = req.params;
    userOfferModel
      .findByOfferAndUser(offer_id, user_id)
      .then(([userOffer]) => res.status(200).send(userOffer))
      .catch((err) => next(err));
  },
};

module.exports = userOfferController;
