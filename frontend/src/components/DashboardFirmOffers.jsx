import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import FirmOffer from "./FirmOffer";
import { GetFirmOffer } from "../apis/firmApi";
import OfferEmpty from "./OfferEmpty";
import OfferForm from "../modals/OfferForm";

const DashboardFirmOffers = ({ id }) => {
  const [firmOffers, setFirmOffers] = useState([]);
  const [reload, setReload] = useState(true);
  const [show, setShow] = useState(false);

  const getFirmOffers = async () => {
    await GetFirmOffer(id)
      .then((res) => setFirmOffers(res.data))
      .catch((err) => console.warn(err));
  };

  const openCreateOffer = () => {
    setShow(true);
  };

  useEffect(() => {
    getFirmOffers();
  }, [reload]);

  return (
    <div>
      <div className="my_favorites_body">
        <div className="my_favorites_offers">
          <div className="all_favorites_offers_titleblock">
            <h2 className="all_favorites_offers_title">Les offres en cours</h2>
            <button
              onClick={() => {
                openCreateOffer();
              }}
              type="submit"
              className="postule-button"
            >
              {" "}
              Créer une annonce{" "}
            </button>
            <OfferForm
              show={show}
              onClose={() => {
                setShow(false);
                setReload(id + 1);
              }}
              firmId={id}
            />
          </div>
          <div className="my_favorites_offers_body">
            {firmOffers.length === 0 ? (
              <OfferEmpty />
            ) : (
              firmOffers.map((offer) => (
                <FirmOffer
                  date={offer.date}
                  firm={offer.name}
                  title={offer.title}
                  logo={offer.logo_url}
                  city={offer.firm_city}
                  id={offer.id}
                  setReload={setReload}
                  reload={reload}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardFirmOffers.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DashboardFirmOffers;
