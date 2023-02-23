import React from "react";
import instagram from "../assets/img/instagram.png";
import facebook from "../assets/img/facebooklogo.png";
import twitter from "../assets/img/twitterlogo.png";
import "../styles/Footer.css";
import dataFooter from "../utils/dataFooter";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div>
          <h3>WorkIT, cabinet de recrutement informatique</h3>
          <p>
            WorkIT c'est un cabinet de recrutement informatique et de conseil RH
            qui répond aux vrais besoins de vraies personnes.
          </p>
        </div>
        <div className="footer-information">
          <h3>Informations</h3>
          <ul>
            {dataFooter.infosSite.map((info) => (
              <li>
                <a href={info.lien}>{info.titre}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <div>
            {dataFooter.infosContact.map((info) => (
              <p>{info}</p>
            ))}
          </div>
        </div>
        <div className="social-network">
          <h3>Réseaux Sociaux</h3>
          <div className="social-network-content">
            <img src={instagram} alt="logo" className="social-network-logo" />
            <img src={facebook} alt="logo" className="social-network-logo" />
            <img src={twitter} alt="logo" className="social-network-logo" />
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>WorkIT © 2022 - Tous droits réservés</p>
      </div>
    </div>
  );
};

export default Footer;
