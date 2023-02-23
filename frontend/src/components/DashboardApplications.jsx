import { React, useEffect, useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import Offer from "./Offer";
import OfferEmpty from "./OfferEmpty";
import { GetCandidatedsByUser } from "../apis/candidatedApi";

const DashboardApplications = () => {
  const { auth } = useContext(authContext);
  const [myApplications, setMyApplications] = useState([]);
  const [reload, setReload] = useState(0);

  const getAllApplicationsId = async () => {
    await GetCandidatedsByUser(auth.data.id).then((res) =>
      setMyApplications(res.data)
    );
  };

  useEffect(() => {
    getAllApplicationsId();
  }, [reload]);

  return (
    <div className="my_applications_body">
      <div className="my_applications_offers">
        <div className="my_applications_titleblock">
          <h2 className="my_applications_title">Mes candidatures</h2>
        </div>
        <div className="my_applications_offers_body">
          {myApplications.length === 0 ? (
            <OfferEmpty />
          ) : (
            myApplications.map((offer) => (
              <Offer
                date={offer.date}
                firm={offer.name}
                title={offer.title}
                logo={offer.logo_url}
                city={offer.firm_city}
                id={offer.id}
                setReload={setReload}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardApplications;
