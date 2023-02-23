import { React, useState } from "react";
import PropTypes from "prop-types";
import OfferDetail from "../modals/OfferDetail";
import "../styles/Offer.css";

const Offer = ({
  firm,
  date,
  title,
  logo,
  city,
  id,
  setReload,
  reload,
  handleDelete,
  button,
  alertId,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [show, setShow] = useState(false);

  const formatedDate = new Date(date).toLocaleDateString();
  return (
    <div className="bloc_offer">
      <div className="offer_block_job">
        <p id="text_entreprise">{firm}</p>
        <br />
        <p id="text_job">{title}</p>
        <div className="offer_filter">
          <p className="border_button">{city}</p>
        </div>
        <p id="text_date">{formatedDate}</p>
      </div>
      <div className="offer_block_details">
        <div
          onClick={() => setIsFavorite(!isFavorite)}
          onKeyDown=""
          role="presentation"
        />
        <OfferDetail
          show={show}
          button={button}
          handleDelete={handleDelete}
          onClose={() => {
            setShow(false);
            setReload(reload + 1);
          }}
          offerId={id}
          alertId={alertId}
        />
      </div>
      <img src={logo} alt="logo entreprise" className="offer_logo" />
      <div className="see_offer_div">
        <button
          type="submit"
          id="border_button_offer"
          onClick={() => setShow(true)}
        >
          Voir l'offre
        </button>
      </div>
    </div>
  );
};

Offer.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  firm: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  reload: PropTypes.number.isRequired,
  setReload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  button: PropTypes.func.isRequired,
  alertId: PropTypes.number.isRequired,
};

export default Offer;
