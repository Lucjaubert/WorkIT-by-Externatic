const userModel = require("../models/userModel");

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  userModel.findByEmail(email).then(([user]) => {
    if (!user) {
      next();
    } else {
      res.send(`${email} already exists`);
    }
  });
};

module.exports = checkEmail;
