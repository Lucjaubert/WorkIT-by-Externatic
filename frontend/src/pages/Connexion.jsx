import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { authContext } from "../context/AuthContext";
import BannierePartenaire from "../components/BannierePartenaire";
import "../styles/Connexion.css";
import Background from "../components/Background";

const Connexion = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, auth } = useContext(authContext);

  useEffect(() => {
    if (auth.data) {
      navigate("/Main");
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    axios
      .post(
        `${apiUrl}${user}/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line no-undef
          login(res.data);
        }
      })
      .catch((err) => setError(err.response.data.message));
    event.preventDefault();
  };

  return (
    <div>
      <motion.div
        className="connexion-candidat"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="title">
          <h4>Connecte toi</h4>
          <h4>
            à ton espace {user === "user" ? "personnel" : ""}{" "}
            {user === "consultant" ? "consultant" : ""}{" "}
            {user === "admin" ? "administrateur" : ""}
          </h4>
        </div>
        <form
          name="connexion"
          method="post"
          className="connexion-form"
          onSubmit={handleSubmit}
        >
          <div className="connexion-input">
            <label htmlFor="Email">Adresse email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="test@blabla.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="connexion-input">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="connexion-button">
            <p className="error-message">{error}</p>
            <button className="uppercase" type="submit">
              Je me connecte
            </button>
          </div>
          <div className="small_link">
            <h4>
              <Link to="/ForgottenPassword">Mot de passe oublié ?</Link>
            </h4>
            {user === "user" && (
              <h4>
                <Link to="/CreateProfile">Créer un profil ici </Link>
              </h4>
            )}
          </div>
        </form>
        <div>{user === "user" && <BannierePartenaire />}</div>
        <Background user={user} />
      </motion.div>
    </div>
  );
};

export default Connexion;

Connexion.propTypes = {
  user: PropTypes.string.isRequired,
};
