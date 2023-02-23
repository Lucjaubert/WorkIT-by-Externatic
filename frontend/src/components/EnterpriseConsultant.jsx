import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { authContext } from "../context/AuthContext";
import { GetFirmOffer } from "../apis/firmOfferApi";
import CreateFirmForm from "./CreateFirmForm";
import search from "../assets/img/search_icon2.png";
import GridEntreprises from "./GridEntreprises";
import "../styles/EnterpriseConsultant.css";

const EnterpriseConsultant = () => {
  const [myEnterprises, setMyEnterprises] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { auth } = useContext(authContext);

  const getFirmOffer = async () => {
    setMyEnterprises(await GetFirmOffer());
  };

  useEffect(() => {
    getFirmOffer();
  }, []);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const filteredFirms = myEnterprises.filter((firm) => {
    return firm.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="container_enterprise_body">
      <div className="enterprise-box">
        <div
          className={
            auth.data.role_id === 2
              ? "enterprise-details"
              : "enterprise-details-admin"
          }
        >
          <h2>Mes entreprises</h2>
          <div className="search-box-enterprise">
            <form className="form-box-enterprise" onSubmit={handleSubmit}>
              <input
                className="search-input-enterprise"
                type="text"
                placeholder="Rechercher une entreprise"
                value={searchValue}
                onChange={handleSearch}
              />
              <img
                src={search}
                alt="search"
                className="logo-search-enterprises"
              />
            </form>
          </div>
          <button
            type="button"
            className="button_create_firm"
            onClick={handleShowForm}
          >
            Créer une fiche entreprise
          </button>
        </div>
        <div className="dashboard_body">
          <GridEntreprises filteredFirms={filteredFirms} />
        </div>
      </div>

      <Modal
        isOpen={showForm}
        onRequestClose={handleShowForm}
        className="modal"
        overlayClassName="overlay"
      >
        <CreateFirmForm setShowForm={setShowForm} />
      </Modal>
    </div>
  );
};

export default EnterpriseConsultant;
