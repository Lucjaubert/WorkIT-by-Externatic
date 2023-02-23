import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authContext } from "../context/AuthContext";
import shape1 from "../assets/img/bloc-blanc.png";
import shape2 from "../assets/img/bloc-violet.png";
import wlogo from "../assets/img/logo-central.png";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);

  useEffect(() => {
    if (auth.data) {
      navigate("/Main");
    }
  }, []);

  return (
    <motion.div
      className="home_page"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="title_block">
        <h2>
          Chez WorkIT, nous te connectons avec les meilleures entreprises.
        </h2>
        <h2> Viens nous parler de toi... </h2>
      </div>
      <div className="main_container_home">
        <img className="shape1" src={shape1} alt="polygone" />
        <img className="wlogo" src={wlogo} alt="logo" />
        <img className="shape2" src={shape2} alt="polygone" />
        <div className="container_text">
          <div className="container_candidat">
            <h3 className="connexion_block_home">Espace candidat</h3>
            <p>
              Rejoins notre communauté de workers et trouve une entreprise qui
              te correspond
            </p>
            <Link to="/ConnexionCandidat">
              <button type="button" className="button_mainpage_candidat">
                {" "}
                ACCES CANDIDAT
              </button>
            </Link>
            <p className="p_small">
              Vous n’avez pas de compte ?{" "}
              <Link to="/CreateProfile" className="link_p">
                Inscrivez-vous
              </Link>
            </p>
            <p className="p_small">
              Simple visiteur ?{" "}
              <Link to="/Main" className="link_p">
                Cliquez-ici
              </Link>
            </p>
          </div>
          <div className="container_consultant">
            <h3 className="connexion_block_home">Espace consultant</h3>
            <p>Trouve un candidat idéal pour tes clients</p>
            <Link to="/ConnexionConsultant">
              <button type="button" className="button_mainpage_consultant">
                {" "}
                ACCES CONSULTANT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
