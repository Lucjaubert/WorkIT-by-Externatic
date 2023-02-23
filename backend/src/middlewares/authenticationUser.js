const jwt = require("jsonwebtoken");

const authenticationUser = (req, res, next) => {
  const token = req.cookies.acces_token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);

  req.userid = data.id;
  req.useremail = data.email;
  req.userfirstname = data.firstname;
  req.userlastname = data.lastname;
  req.roleId = data.role_id;
  return next();
};

module.exports = authenticationUser;
