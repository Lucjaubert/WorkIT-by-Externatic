const express = require("express");

const candidatedRouter = express.Router();

const candidatedController = require("../controllers/candidatedController");

candidatedRouter.get("/", candidatedController.getAllcandidateds);
candidatedRouter.get("/user/", candidatedController.getCandidatedByUser);
candidatedRouter.post("/", candidatedController.postCandidated);
candidatedRouter.put("/:id", candidatedController.putCandidated);
candidatedRouter.delete("/:id", candidatedController.deleteCandidated);
candidatedRouter.get(
  "/user/:user_id",
  candidatedController.getCandidatedsByUser
);

module.exports = candidatedRouter;
