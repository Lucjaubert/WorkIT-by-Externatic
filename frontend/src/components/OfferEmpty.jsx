import React from "react";
import "../styles/Offer.css";

const OfferEmpty = () => {
  return (
    <div className="bloc_offer">
      <div className="offer_block_job">
        <p id="text_entreprise">Aucune offre trouvée</p>
      </div>
    </div>
  );
};

export default OfferEmpty;
