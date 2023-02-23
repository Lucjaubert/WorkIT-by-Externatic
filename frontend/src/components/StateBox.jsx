import React from "react";
import PropTypes from "prop-types";
import stateOffer from "../utils/stateOffer";
import "../styles/PublicationDateBox.css";

const StateBox = ({ setFilterOffer, filterOffer }) => {
  return (
    <div className="publication_date_box">
      <div className="date_titleblock">
        <h3 className="date_title">ETAT DE L'OFFRE</h3>
      </div>
      <div className="date_body">
        <fieldset>
          {stateOffer.map((etat) => (
            <div>
              <input
                className="input_date"
                type="radio"
                id={etat.id}
                name={etat.name}
                value={etat.value}
                onChange={(e) =>
                  setFilterOffer({
                    ...filterOffer,
                    [e.target.name]: Number(e.target.id),
                  })
                }
              />
              <label htmlFor={etat.id}>{etat.value}</label>
            </div>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default StateBox;

StateBox.propTypes = {
  setFilterOffer: PropTypes.func.isRequired,
  filterOffer: PropTypes.string.isRequired,
};
