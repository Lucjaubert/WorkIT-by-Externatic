/* eslint-disable camelcase */
const argon2 = require("argon2");
const adminModel = require("../models/adminModel");
const { jwtSign } = require("../helpers/jwt");

const adminController = {
  getAllAdmins: (req, res, next) => {
    adminModel
      .findAll()
      .then(([admins]) => res.status(200).send(admins))
      .catch((err) => next(err));
  },
  getAdminById: (req, res, next) => {
    const { id } = req.params;
    adminModel
      .findOne(id)
      .then(([admin]) => res.status(200).send(admin))
      .catch((err) => next(err));
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    adminModel
      .findByEmail(email)
      .then(async ([admin]) => {
        if (!admin) {
          res.status(401).send({ message: "Email ou mot de passe invalide" });
        } else {
          const {
            id,
            role_id,
            email: adminEmail,
            firstname,
            lastname,
            password: hashedPassword,
          } = admin;

          if (await argon2.verify(hashedPassword, password)) {
            const token = jwtSign(
              { id, adminEmail, firstname, lastname, role_id },
              { expiresIn: "1h" }
            );
            res
              .cookie("acces_token", token, { httpOnly: true, secure: true })
              .status(200)
              .send({
                message: "Admin logged in successfully",
                id,
                email,
                firstname,
                lastname,
                role_id,
              });
          } else {
            res.status(404).send({ message: "Email ou mot de passe invalide" });
          }
        }
      })
      .catch((err) => next(err));
  },
};

module.exports = adminController;
