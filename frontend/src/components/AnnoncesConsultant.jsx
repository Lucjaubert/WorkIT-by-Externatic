import React, { useState, useEffect } from "react";
import "../styles/AnnoncesConsultant.css";
import "../styles/OffersList.css";
import { GetOffers } from "../utils/getOffers";
import Offer from "./Offer";
import StateBox from "./StateBox";

const AnnoncesConsultant = () => {
  const [offers, setOffers] = useState([]);
  const [filterOffer, setFilterOffer] = useState({
    city: "",
    selectedJob: "",
    salary: "",
    state: 0,
  });

  const getFilterOffers = async () => {
    setOffers(await GetOffers(filterOffer));
  };

  useEffect(() => {
    getFilterOffers();
  }, [filterOffer]);

  return (
    <div className="annonce-consultant">
      <div className="filters_offers">
        <div className="mainPage_filters">
          <StateBox setFilterOffer={setFilterOffer} filterOffer={filterOffer} />
        </div>
        <div className="mainPage_offers">
          <div className="all_offers_titleblock">
            <h2 className="all_offers_title">Les Offres</h2>
          </div>
          <div className="offers_body">
            {offers.map((offer) => (
              <Offer
                firm={offer.name}
                date={offer.date}
                title={offer.title}
                logo={offer.logo_url}
                city={offer.city}
                experience={offer.experience}
              />
            ))}
            <button type="button" className="all_offres_button_consultant">
              {" "}
              Voir plus d'offres{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnoncesConsultant;
