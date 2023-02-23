import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/Error.css";

const Error = () => {
  return (
    <div className="error">
      <NavBar />
      <div className="errorPage">
        <h1 id="title">Oups !</h1>
        <p>La page que vous recherchez n'existe pas.</p>
        <p>Code Erreur 404</p>
        <p>Retourner sur la page d'acceuil :</p>
        <Link to="/" id="projetsError">
          Page d'accueil
        </Link>
      </div>
    </div>
  );
};

export default Error;
