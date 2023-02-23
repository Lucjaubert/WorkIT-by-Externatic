import React from "react";
import PropTypes from "prop-types";
import publicationDate from "../utils/publicationDate";
import "../styles/PublicationDateBox.css";

const PublicationDateBox = ({ setDate }) => {
  const now = new Date().getTime();
  const last24h = now - 24 * 60 * 60 * 1000;
  const last3days = now - 3 * 24 * 60 * 60 * 1000;
  const last7days = now - 7 * 24 * 60 * 60 * 1000;
  const lastMonth = now - 30 * 24 * 60 * 60 * 1000;

  const handleDate = (e) => {
    switch (e.target.value) {
      case "Toutes les dates":
        setDate("");
        break;
      case "Dernières 24 heures":
        setDate(new Date(last24h).toISOString());
        break;
      case "Depuis 3 jours":
        setDate(new Date(last3days).toISOString());
        break;
      case "Depuis 1 semaine":
        setDate(new Date(last7days).toISOString());
        break;
      case "Depuis 1 mois":
        setDate(new Date(lastMonth).toISOString());
        break;
      default:
        setDate("");
    }
  };

  return (
    <div className="publication_date_box">
      <div className="date_titleblock_section">
        <h3 className="date_title"> Date de publication</h3>
      </div>
      <div className="date_body">
        <fieldset>
          {publicationDate.map((date) => (
            <div>
              <input
                className="input_date"
                type="radio"
                id={date.id}
                name={date.name}
                value={date.value}
                onChange={(e) => handleDate(e)}
              />
              <label htmlFor={date.id}>{date.value}</label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default PublicationDateBox;

PublicationDateBox.propTypes = {
  setDate: PropTypes.func.isRequired,
};
