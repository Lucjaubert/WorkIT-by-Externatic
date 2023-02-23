import { React, useEffect, useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { GetAlerts, DeleteAlert } from "../apis/alertApi";
import Offer from "./Offer";
import OfferEmpty from "./OfferEmpty";

const DashboardNewOffers = () => {
  const [reload, setReload] = useState(0);
  const { auth, setNotification } = useContext(authContext);
  const [myOffers, setMyOffers] = useState([]);

  const getAlerts = async () => {
    if (auth.data.role_id === 1) {
      await GetAlerts(auth.data.id).then((res) => {
        setMyOffers(res.data);
        setNotification(res.data.length);
      });
    }
  };

  const handleDelete = (id) => {
    DeleteAlert(id).then((res) => {
      if (res.status === 200) {
        getAlerts();
      }
    });
  };

  useEffect(() => {
    getAlerts();
  }, [reload]);

  return (
    <div className="my_applications_body">
      <div className="my_applications_offers">
        <div className="my_applications_titleblock">
          <h2 className="my_applications_title"> Mes nouvelles offres </h2>
        </div>
        <div className="my_applications_offers_body">
          {myOffers.length === 0 ? (
            <OfferEmpty />
          ) : (
            myOffers.map((offer) => (
              <div>
                <Offer
                  alertId={offer.alert_id}
                  date={offer.date}
                  firm={offer.name}
                  title={offer.title}
                  logo={offer.logo_url}
                  city={offer.firm_city}
                  id={offer.offer_id}
                  button="ok"
                  setReload={setReload}
                  handleDelete={handleDelete}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNewOffers;
