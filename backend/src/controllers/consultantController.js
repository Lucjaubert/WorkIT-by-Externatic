/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const consultantModel = require("../models/consultantModel");

const consultantController = {
  getAllConsultants: (req, res, next) => {
    consultantModel
      .findAll()
      .then(([consultants]) => res.status(200).send(consultants))
      .catch((err) => next(err));
  },
  getConsultantById: (req, res, next) => {
    const { id } = req.params;
    consultantModel
      .findOne(id)
      .then(([consultant]) => res.status(200).send(consultant))
      .catch((err) => next(err));
  },
  createConsultant: async (req, res, next) => {
    const {
      role_id,
      firstname,
      lastname,
      phone,
      city,
      email,
      password,
      linkedin,
    } = req.body;
    const hashedPassword = await argon2.hash(password);
    consultantModel
      .create({
        role_id,
        firstname,
        lastname,
        phone,
        city,
        email,
        password: hashedPassword,
        linkedin,
      })
      .then(([consultant]) =>
        res.status(201).send({
          mesage: "consultant created",
          id: consultant.insertId,
          email,
          firstname,
          lastname,
          hashedPassword,
        })
      )
      .catch((err) => next(err));
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    consultantModel
      .findByEmail(email)
      .then(async ([consultant]) => {
        if (!consultant) {
          return res
            .status(401)
            .send({ message: "Email ou mot de passe invalide" });
        }
        const {
          id,
          role_id,
          email: userEmail,
          firstname,
          lastname,
          password: hashedPassword,
          consultant_id,
        } = consultant;
        if (await argon2.verify(hashedPassword, password)) {
          const token = jwt.sign(
            { id, userEmail, firstname, lastname, role_id, consultant_id },
            process.env.JWT_AUTH_SECRET,
            { expiresIn: "1h" }
          );
          res
            .cookie("access_token", token, { httpOnly: true, secure: true })
            .status(200)
            .send({
              message: "Login successful",
              id,
              email,
              firstname,
              lastname,
              role_id,
              consultant_id,
            });
        } else {
          res.status(401).send({ message: "Email ou mot de passe invalide" });
        }
      })

      .catch((err) => next(err));
  },
  deleteConsultant: (req, res, next) => {
    const { id } = req.params;
    consultantModel
      .deleteOne(id)
      .then(([consultant]) => res.status(200).send(consultant))
      .catch((err) => next(err));
  },
};

module.exports = consultantController;
