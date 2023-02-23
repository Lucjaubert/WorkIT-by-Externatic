const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/userController");
const checkEmail = require("../middlewares/checkEmail");
const emailValidator = require("../middlewares/Validator");
const { upload } = require("../helpers/multer");

userRouter.post("/login", userController.login);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.post(
  "/createprofile",
  checkEmail,
  emailValidator,
  userController.createUser
);
userRouter.put("/resetPassword", userController.resetPassword);

userRouter.put("/changePassword/:id", userController.updatePassword);
userRouter.post("/checkToken", userController.verifyToken);
userRouter.put("/upload/:id", upload.single("file"), userController.updateCv);
userRouter.put(
  "/uploadPhoto/:id",
  upload.single("photo"),
  userController.updateImage
);
userRouter.put("/:id", userController.updateUser);

module.exports = userRouter;
