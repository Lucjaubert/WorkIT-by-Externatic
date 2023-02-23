import React from "react";
import "../styles/BannierePartenaire.css";
import logosBannière from "../utils/logosBanniere";

const BannierePartenaire = () => {
  return (
    <div className="banniere">
      <p>Ils nous font confiance</p>
      <div className="banniere-logo">
        {logosBannière.map((logo) => (
          <img src={logo.image} alt={logo.title} key={logo.number} />
        ))}
      </div>
    </div>
  );
};

export default BannierePartenaire;
