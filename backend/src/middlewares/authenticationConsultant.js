const jwt = require("jsonwebtoken");

const authenticationConsultant = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).send({ message: "Unauthorized" });
  }
  const data = jwt.verify(token, process.env.JWT_AUTH_SECRET_CONS);
  req.userId = data.id;
  req.firstName = data.firstname;
  req.lastName = data.lastname;
  req.email = data.email;

  return next();
};

module.exports = authenticationConsultant;
