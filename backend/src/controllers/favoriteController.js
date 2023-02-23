/* eslint-disable camelcase */
const favoriteModel = require("../models/favoriteModel");

const favoriteController = {
  getAllfavorites: (req, res, next) => {
    favoriteModel
      .findAll()
      .then((favorites) => res.status(200).send(favorites))
      .catch((err) => next(err));
  },
  getfavoriteById: (req, res, next) => {
    const { id } = req.params;
    favoriteModel
      .findOne(id)
      .then(([favorite]) => res.status(200).send(favorite))
      .catch((err) => next(err));
  },
  getfavoriteByUser: (req, res, next) => {
    const { offer_id } = req.query;
    const { user_id } = req.query;
    favoriteModel
      .findOneByUser(user_id, offer_id)
      .then(([favorite]) => res.status(200).send(favorite))
      .catch((err) => next(err));
  },
  postFavorite: (req, res, next) => {
    const { user_id, offer_id } = req.body;
    favoriteModel
      .createOne({ user_id, offer_id })
      .then((favorite) => res.status(200).send(favorite))
      .catch((err) => next(err));
  },
  deleteFavorite: (req, res, next) => {
    const { id } = req.params;
    favoriteModel
      .deleteOne(id)
      .then((favorite) => res.status(200).send(favorite))
      .catch((err) => next(err));
  },
  getFavoritesByUser: (req, res, next) => {
    const { user_id } = req.params;
    favoriteModel
      .findAllByUser(user_id)
      .then((favorites) => res.status(200).send(favorites))
      .catch((err) => next(err));
  },
};

module.exports = favoriteController;
