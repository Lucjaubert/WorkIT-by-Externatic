import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { authContext } from "../context/AuthContext";
import { GetOfferById } from "../apis/offerApi";
import {
  GetFavoriteByUserAndOffer,
  PostFavorite,
  DeleteFavorite,
} from "../apis/favoriteApi";
import {
  GetCandidatedByUserAndOffer,
  PostCandidated,
} from "../apis/candidatedApi";
import close from "../assets/img/annuler.png";
import isfav from "../assets/img/fav.png";
import notfav from "../assets/img/notfav.png";
import "../styles/Modal.css";

const OfferDetail = ({
  show,
  onClose,
  offerId,
  handleDelete,
  button,
  alertId,
}) => {
  if (!show) {
    return null;
  }
  const [postulation, setPostulation] = useState("");
  const [dataOffer, setDataOffer] = useState({});
  const { auth } = useContext(authContext);
  const [favoriteId, setFavoriteId] = useState();
  const [candidatedId, setCandidatedId] = useState();
  const initUserOffer = () => {
    if (auth.data) {
      if (auth.data.role_id === 1) {
        GetFavoriteByUserAndOffer(auth.data.id, offerId).then((res) => {
          if (res.data) {
            setFavoriteId(res.data.favorite_id);
          }
        });
        GetCandidatedByUserAndOffer(auth.data.id, offerId).then((res) => {
          if (res.data) {
            setCandidatedId(res.data.candidated_id);
          }
        });
      }
    }
  };

  useEffect(() => {
    GetOfferById(offerId).then((res) => setDataOffer(res.data));
    initUserOffer();
  }, []);

  const setFavorite = () => {
    if (favoriteId) {
      DeleteFavorite(favoriteId).then((res) => console.warn(res));
      setFavoriteId(null);
    } else {
      PostFavorite(auth.data.id, offerId).then((response) => {
        if (response.data) {
          GetFavoriteByUserAndOffer(auth.data.id, offerId).then((res) => {
            if (res.data.favorite_id) {
              setFavoriteId(res.data.favorite_id);
            }
          });
        }
      });
    }
  };

  const handleSubmit = () => {
    if (auth.data) {
      if (auth.data.role_id === 1) {
        PostCandidated(auth.data.id, offerId).then((response) => {
          if (response.data) {
            GetCandidatedByUserAndOffer(auth.data.id, offerId).then((res) => {
              if (res.data.candidated_id) {
                setCandidatedId(res.data.candidated_id);
              }
            });
          }
        });
      }
    } else {
      setPostulation("Veuillez vous connecter pour postuler");
    }
  };

  /* eslint no-return-assign: "error" */
  return ReactDOM.createPortal(
    <div
      className="modalBox"
      onClick={onClose}
      onKeyDown={onClose}
      role="textbox"
      tabIndex={0}
    >
      <div
        role="textbox"
        className="modalContent"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <div className="modal-header">
          <div className="header-img">
            <img
              src={dataOffer.logo_url}
              alt={dataOffer.logo_url}
              className="offer_detail_image"
            />
            <img
              className="offer_close_button"
              aria-hidden="true"
              onClick={onClose}
              onKeyDown={onClose}
              src={close}
              alt="close"
            />
          </div>
          <div className="offer_header_block">
            <div className="offer_header_block_one">
              <h3 className="modal-title"> {dataOffer.title} </h3>
              <p>
                {"   Offre publiée le "}{" "}
                {new Date(dataOffer.date).toLocaleDateString()}{" "}
              </p>
            </div>
            {auth.data && auth.data.role_id === 1 ? (
              <img
                className="offer_favourite_button"
                aria-hidden="true"
                onClick={() => {
                  setFavorite();
                }}
                onKeyDown={onClose}
                src={favoriteId ? isfav : notfav}
                alt="close"
              />
            ) : null}
          </div>
        </div>

        <div className="modal-body">
          <h3 className="modal-subtitle">Lieu</h3>
          <p className="modal-text-uppercase"> {dataOffer.firm_city} </p>
          <h3 className="modal-subtitle">Description de la société</h3>
          <p className="modal-text"> {dataOffer.description_firm} </p>
          <h3 className="modal-subtitle">Mission proposée</h3>
          <p className="modal-text"> {dataOffer.description_mission} </p>
          <h3 className="modal-subtitle">Environnement technique</h3>
          <p className="modal-text"> {dataOffer.hard_skills} </p>

          {
            (dataOffer.soft_skills = !"-" && (
              <div>
                <h3 className="modal-subtitle">Compétences relationnelles</h3>
                <p className="modal-text"> {dataOffer.soft_skills} </p>{" "}
              </div>
            ))
          }

          <h3 className="modal-subtitle">Expérience requise</h3>
          <p className="modal-text">{dataOffer.experience} </p>
          <h3 className="modal-subtitle">Salaire brut annuel proposé</h3>
          <p className="modal-text">{dataOffer.salary}€ </p>
        </div>
        <div className="modal-footer">
          <p className="send-signIn">{postulation}</p>
          {candidatedId ? (
            <p className="send-candidature">
              Votre candidature a bien été envoyée. Votre interlocuteur vous
              contactera prochainement.
            </p>
          ) : (
            <div className="offer_button_postulation">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
                className="postule_button_offer"
              >
                {" "}
                Je postule{" "}
              </button>
            </div>
          )}
          {button === "ok" && (
            <button
              type="submit"
              className="alert_seen_button"
              onClick={() => handleDelete(alertId)}
            >
              Marquer comme vu
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("app")
  );
};

OfferDetail.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  button: PropTypes.func.isRequired,
  alertId: PropTypes.number.isRequired,
};
export default OfferDetail;
