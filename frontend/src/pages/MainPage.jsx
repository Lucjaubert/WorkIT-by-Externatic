import { React, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { authContext } from "../context/AuthContext";
import { GetAlerts } from "../apis/alertApi";
import OfferEmpty from "../components/OfferEmpty";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { FilterOffer } from "../apis/offerApi";
import Offer from "../components/Offer";
import SalaryBox from "../components/SalaryBox";
import PublicationDateBox from "../components/PublicationDateBox";
import "../styles/MainPage.css";
import "../styles/OffersList.css";

const MainPage = () => {
  const [offers, setOffers] = useState([]);
  const [city, setCity] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [choosenDate, setChoosenDate] = useState("");
  const [salary, setSalary] = useState(0);
  const [limit, setLimit] = useState(5);
  const { auth, setNotification } = useContext(authContext);

  const handleLimit = () => {
    setLimit(limit + 5);
  };

  const filterOffers = async () => {
    await FilterOffer(city, selectedJob, salary, choosenDate, limit).then(
      (res) => {
        setOffers(res.data);
      }
    );
  };

  const getAlerts = async () => {
    if (auth.data.role_id === 1) {
      await GetAlerts(auth.data.id).then((res) => {
        setNotification(res.data.length);
      });
    }
  };

  useEffect(() => {
    getAlerts();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [city, selectedJob, choosenDate, salary, limit]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar />
      <div className="mainPage_body">
        <h2 className="mainpage_introduction">
          Comprendre ton histoire, ton parcours, ton projet, c'est ce qui nous
          motive
        </h2>
        <SearchBar setSelectedJob={setSelectedJob} setCity={setCity} />
        <div className="filters_offers">
          <div className="mainPage_filters">
            <SalaryBox salary={salary} setSalary={setSalary} />
            <PublicationDateBox setDate={setChoosenDate} />
          </div>
          <div className="mainPage_offers">
            <div className="all_offers_titleblock">
              <h3 className="all_offers_title">Les offres du moment</h3>
            </div>
            <div className="offers_body">
              {offers.length === 0 ? (
                <OfferEmpty />
              ) : (
                offers.map((offer) => (
                  <Offer
                    firm={offer.name}
                    date={offer.date}
                    title={offer.title}
                    logo={offer.logo_url}
                    city={offer.firm_city}
                    id={offer.id}
                  />
                ))
              )}
              <button
                type="button"
                className="all_offres_button"
                onClick={handleLimit}
              >
                {" "}
                Voir plus d'offres{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default MainPage;
