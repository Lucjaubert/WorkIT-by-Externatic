// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../apis/checkToken";
import { modifyPassword } from "../apis/modifyPassword";
import BannierePartenaire from "../components/BannierePartenaire";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const { token, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(token)
      .then((response) => setEmail(response.data.user))
      .catch((error) => console.warn(error));
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    modifyPassword(id, password)
      .then((response) => {
        setMessage(response.data);
        setTimeout(() => {
          navigate("/ConnexionCandidat");
        }, 2000);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="reset_password">
        <div className="reset_password_title">
          <h1>Change ton mot de passe</h1>
        </div>
        <form
          name="reset_password"
          method="post"
          className="reset_password_form"
          onSubmit={handleSubmit}
        >
          <div className="reset_password_input">
            <label htmlFor="Email">Ton adresse email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="test@blabla.com"
              value={email}
              disabled
            />
          </div>
          <div className="reset_password_input">
            <label htmlFor="password">Ton nouveau mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="reset_password_button">
            <button className="uppercase" type="submit">
              Soumettre mot de passe
            </button>
          </div>
          {message && <h3 className="resetpassword_message">{message}</h3>}
        </form>
        <div>
          <BannierePartenaire />
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
