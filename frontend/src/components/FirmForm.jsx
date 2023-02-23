import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { GetFirmData, UpdateFirm, DeleteFirm } from "../apis/firmApi";
import DashboardFirmOffers from "./DashboardFirmOffers";
import { GetAllFirms } from "../utils/getAllEnterprises";
import "../styles/FirmForm.css";
import NavBar from "./NavBar";

const FirmForm = ({ setMessage }) => {
  const { id } = useParams();
  const [firm, setFirm] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const getFirmData = async () => {
    await GetFirmData(id)
      .then((res) => setFirm(res.data))
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    getFirmData();
  }, []);

  const handleChange = (e, customValue) => {
    const { name, value } = e.target;
    setFirm((prevState) => ({
      ...prevState,
      [name]: customValue ?? value,
    }));
  };

  const updateFirm = async () => {
    try {
      await UpdateFirm(firm, id);
      setMessage("Mise à jour effectuée avec succès");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = () => {
    DeleteFirm(id)
      .then(() => GetAllFirms())
      .catch((err) => console.warn(err));
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="firm_form_dashboard">
          <div className="box_firm_body_title">
            <h2>Fiche entreprise</h2>
          </div>
          <div className="box_firm_body">
            <div className="informations-entreprise">
              <div className="first_line_details">
                <div className="first_line_text">
                  <div className="entreprise_name">
                    Nom de l'entreprise
                    <label>
                      <input
                        type="text"
                        name="name"
                        className="small-input"
                        value={firm.name}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="consultant_firm">
                    Consultant attitré
                    <label>
                      <input
                        type="text"
                        name="consultant_id"
                        className="very-small-input"
                        value={firm.consultant_id}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="logo_firm_block">
                  <img
                    src={firm.logo_url}
                    alt="Logo_firm"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="Id_firm">
              Id client
              <label>
                <input
                  type="text"
                  name="firm_id"
                  className="very-small-input"
                  value={firm.id}
                />
              </label>
              <label>
                Secteur
                <input
                  type="text"
                  name="type"
                  className="very-small-input"
                  value={firm.type}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="third_line-details">
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  className="small-input"
                  value={firm.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Téléphone
                <input
                  type="text"
                  name="contact_phone"
                  className="small-input"
                  value={firm.contact_phone}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Adresse
                <input
                  type="text"
                  name="adress"
                  className="small-input"
                  value={firm.adress}
                  onChange={handleChange}
                />
              </label>
              <label>
                Ville
                <input
                  type="text"
                  name="city"
                  className="small-input"
                  value={firm.city}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Pays
                <input
                  type="text"
                  name="country"
                  className="small-input"
                  value={firm.country}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="box_firm_footer">
              <div className="validate_edit">
                {isEditing ? (
                  <button
                    type="submit"
                    className="btn-enregistrer"
                    onClick={updateFirm}
                  >
                    Enregistrer
                  </button>
                ) : (
                  <button type="submit" onClick={() => setIsEditing(true)}>
                    Modifier
                  </button>
                )}
                <button
                  type="submit"
                  className="delete_button"
                  onClick={handleDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="current_offers">
        <DashboardFirmOffers id={id} />
      </div>
    </>
  );
};

FirmForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default FirmForm;
