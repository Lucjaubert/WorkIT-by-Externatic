import { React, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AddConsultantInput from "./AddConsultantInput";
import dataFicheConsultant from "../utils/dataFicheConsultant";
import profileimage from "../assets/img/profileimage.png";
import close from "../assets/img/annuler.png";
import "../styles/FicheConsultant.css";

const FicheConsultant = ({ showFiche, setShowFiche }) => {
  const [message, setMessage] = useState(false);
  const [addNewConsultant, setAddNewConsultant] = useState({
    role_id: 2,
    firstname: null,
    lastname: null,
    phone: null,
    city: null,
    email: null,
    password: null,
    linkedin: null,
    position: null,
    perimeter: null,
  });

  const postConsultant = (event) => {
    event.preventDefault();
    if (
      addNewConsultant.firstname === null &&
      addNewConsultant.lastname === null &&
      addNewConsultant.phone === null &&
      addNewConsultant.city === null &&
      addNewConsultant.email === null &&
      addNewConsultant.password === null &&
      addNewConsultant.linkedin === null &&
      addNewConsultant.password === null &&
      addNewConsultant.linkedin === null
    ) {
      // eslint-disable-next-line no-alert
      alert("Veuillez remplir tous les champs");
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}consultant/createprofile`, {
          firstname: addNewConsultant.firstname,
          lastname: addNewConsultant.lastname,
          phone: addNewConsultant.phone,
          city: addNewConsultant.city,
          email: addNewConsultant.email,
          password: addNewConsultant.password,
          linkedin: addNewConsultant.linkedin,
          role_id: addNewConsultant.role_id,
        })
        .then(() => {
          setAddNewConsultant({
            firstname: null,
            lastname: null,
            phone: null,
            city: null,
            email: null,
            password: null,
            linkedin: null,
          });
        })
        .catch((err) => console.warn(err));
    }
  };

  const handleClick = () => {
    setShowFiche(!showFiche);
  };

  const showMessage = () => {
    setMessage(!message);
  };

  return (
    <div className="fiche_consultant_container">
      <div className="fiche_consultant_header">
        <h3> Fiche consultant.e</h3>
        <div
          onClick={handleClick}
          onKeyDown={handleClick}
          role="button"
          tabIndex={0}
        >
          <img src={close} alt="close" className="close_fiche_consultant" />
        </div>
      </div>
      <div className="fiche_consultant_body_footer">
        <div className="fiche_consultant_body">
          <form className="fiche_consultant_form" onSubmit={postConsultant}>
            <h1>Informations personnelles</h1>
            <div className="consultant_personal_information_block">
              <div className="consultant_personal_information_inputs">
                {dataFicheConsultant.map((data) => (
                  <AddConsultantInput
                    key={data.id}
                    id={data.id}
                    label={data.label}
                    type={data.type}
                    name={data.name}
                    placeholder={data.placeholder}
                    value={addNewConsultant[data.name] || ""}
                    className={data.className}
                    addNewConsultant={addNewConsultant}
                    setAddNewConsultant={setAddNewConsultant}
                  />
                ))}
              </div>
              <div className="consultant_profile_image_container">
                <img
                  src={profileimage}
                  alt="profileimage"
                  className="consultant_profile_image"
                />
                <button type="button" className="button_change_image">
                  {" "}
                  Changer de photo{" "}
                </button>
              </div>
            </div>

            <div className="fiche_consultant_footer">
              {message && (
                <h1 className="popup_notification">
                  {" "}
                  Un(e) consultant(e) a bien été rajouté(e)
                </h1>
              )}
              <button
                type="submit"
                className="button_save_consultant"
                onClick={showMessage}
              >
                SAUVEGARDER{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

FicheConsultant.propTypes = {
  showFiche: PropTypes.bool.isRequired,
  setShowFiche: PropTypes.func.isRequired,
};

export default FicheConsultant;
