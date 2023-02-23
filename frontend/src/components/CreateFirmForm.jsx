import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { authContext } from "../context/AuthContext";
import NavBar from "./NavBar";
import { CreateFirm } from "../apis/firmApi";
import AddFirmInput from "./AddFirmInput";
import firmForm from "../utils/firmForm";
import close from "../assets/img/close.png";
import "../styles/CreateFirmForm.css";

const CreateFirmForm = ({ setShowForm }) => {
  const { auth } = useContext(authContext);

  const [addNewFirm, setAddNewFirm] = useState({
    name: null,
    logo_url: null,
    email: null,
    contact_phone: null,
    adress: null,
    city: null,
    postal_code: null,
    country: null,
  });

  const [confirmMessage, setConfirmMessage] = useState(false);
  useEffect(
    () => setAddNewFirm({ ...addNewFirm, consultant_id: auth.data.id }),
    [auth.data.id]
  );

  const postFirm = (event) => {
    event.preventDefault();
    if (
      addNewFirm.name === null &&
      addNewFirm.consultant_id === null &&
      addNewFirm.logo_url === null &&
      addNewFirm.email === null &&
      addNewFirm.contact_phone === null &&
      addNewFirm.adress === null &&
      addNewFirm.city === null &&
      addNewFirm.postal_code === null &&
      addNewFirm.country === null
    ) {
      // eslint-disable-next-line no-alert
      return alert("Veuillez remplir tous les champs");
    }
    return CreateFirm({
      name: addNewFirm.name,
      consultant_id: addNewFirm.consultant_id,
      logo_url: addNewFirm.logo_url,
      email: addNewFirm.email,
      contact_phone: addNewFirm.contact_phone,
      adress: addNewFirm.adress,
      city: addNewFirm.city,
      postal_code: addNewFirm.postal_code,
      country: addNewFirm.country,
    })
      .then((res) => {
        if (res.status === 200) {
          setConfirmMessage("Votre entreprise a bien été créée");
        }
      })
      .catch((err) => console.warn(err));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  return (
    <div>
      <NavBar />
      <div className="firm__form__dashboard">
        <div className="box_firm_body_title">
          <h2>Création fiche entreprise</h2>
          <img
            src={close}
            alt="close"
            onClick={handleClick}
            onKeyDown=""
            role="presentation"
          />
        </div>
        <div className="box__firm__body">
          <form className="box__firm__input" onSubmit={postFirm}>
            <h3>Informations de la nouvelle entreprise entrante</h3>
            <div className="informations-entreprise-block">
              <div className="informations-entreprises-inputs">
                {firmForm.map((data) => (
                  <AddFirmInput
                    key={data.id}
                    id={data.id}
                    label={data.label}
                    type={data.type}
                    name={data.name}
                    placeholder={data.placeholder}
                    value={addNewFirm[data.name] || ""}
                    className={data.className}
                    addNewFirm={addNewFirm}
                    setAddNewFirm={setAddNewFirm}
                    confirmMessage={confirmMessage}
                  />
                ))}
              </div>
            </div>
            <div className="firmform_footer">
              {confirmMessage && (
                <p style={{ color: "red" }}>{confirmMessage}</p>
              )}
              <button type="submit" className="button_save_firm">
                Enregistrer{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateFirmForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
};

export default CreateFirmForm;
