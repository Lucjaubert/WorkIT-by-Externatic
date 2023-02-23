import { React, useEffect, useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import { AllFavoriteId } from "../apis/favoriteApi";
import Offer from "./Offer";
import OfferEmpty from "./OfferEmpty";

const Dashboard = () => {
  const { auth } = useContext(authContext);
  const [favoritesOffers, setFavoritesOffers] = useState([]);
  const [reload, setReload] = useState(true);

  const getAllFavoritesId = async () => {
    await AllFavoriteId(auth.data.id).then((res) =>
      setFavoritesOffers(res.data)
    );
  };

  useEffect(() => {
    getAllFavoritesId();
  }, [reload]);

  return (
    <div>
      <div className="my_favorites_body">
        <div className="my_favorites_offers">
          <div className="all_favorites_offers_titleblock">
            <h2 className="all_favorites_offers_title">Mes coups de coeur</h2>
          </div>
          <div className="my_favorites_offers_body">
            {favoritesOffers.length === 0 ? (
              <OfferEmpty />
            ) : (
              favoritesOffers.map((offer) => (
                <Offer
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

export default Dashboard;
