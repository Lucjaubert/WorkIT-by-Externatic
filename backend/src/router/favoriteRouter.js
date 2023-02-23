const express = require("express");

const favoriteRouter = express.Router();

const favoriteController = require("../controllers/favoriteController");

favoriteRouter.get("/", favoriteController.getAllfavorites);
favoriteRouter.get("/user/", favoriteController.getfavoriteByUser);
favoriteRouter.post("/", favoriteController.postFavorite);
favoriteRouter.delete("/:id", favoriteController.deleteFavorite);
favoriteRouter.get("/user/:user_id", favoriteController.getFavoritesByUser);

module.exports = favoriteRouter;
