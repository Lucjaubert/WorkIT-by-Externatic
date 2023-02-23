/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  UpdateOffer,
  GetOfferById,
  DeleteOfferById,
  GetOnlyOfferInfos,
} from "../apis/offerApi";
import { GetAllJobs, GetJobById } from "../apis/jobApi";
import { GetAllExperiences } from "../apis/experienceApi";
import formOffer from "../utils/formOffer";
import close from "../assets/img/annuler.png";
import "../styles/ModalCrud.css";

const OfferCrud = ({ show, onClose, offerId }) => {
  if (!show) {
    return null;
  }
  const [deleteMessage, setDeleteMessage] = useState("");
  const [jobs, setJobs] = useState([]);
  const [dataOffer, setDataOffer] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [infosOffer, setInfosOffer] = useState({});

  const askConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const deleteOffer = () => {
    DeleteOfferById(offerId)
      .then((res) => {
        if (res.status === 200) {
          setDeleteMessage("L'offre a bien été supprimée");
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  const loadJobs = () => {
    GetAllJobs().then((res) => {
      setJobs(res.data);
    });
  };

  const loadExperiences = () => {
    GetAllExperiences().then((res) => {
      setExperiences(res.data);
    });
  };

  const modifyOffer = (e) => {
    e.preventDefault();
    setDisabled(false);
  };

  const confirmModification = (e) => {
    e.preventDefault();
    UpdateOffer(infosOffer, offerId)
      .then((res) => {
        if (res.status === 200) {
          setDisabled(true);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInfosOffer({ ...infosOffer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    infosOffer.job_id &&
      GetJobById(infosOffer.job_id).then((res) => {
        setInfosOffer({ ...infosOffer, title: res.data.job_title });
      });
  }, [infosOffer.job_id]);

  useEffect(() => {
    GetOfferById(offerId).then((res) => setDataOffer(res.data));
    GetOnlyOfferInfos(offerId).then((res) => setInfosOffer(res.data));
    loadJobs();
    loadExperiences();
  }, []);

  // eslint-disable-next-line no-return-assign
  return ReactDOM.createPortal(
    <div
      className="modalCrudBox"
      onClick={onClose}
      onKeyDown={onClose}
      role="textbox"
      tabIndex={0}
    >
      <div
        role="textbox"
        className="modalCrudContent"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <div className="modalCrud-header">
          <div className="header-img">
            <img src={dataOffer.logo_url} alt={dataOffer.logo_url} width="8%" />

            <img
              className="header-button"
              aria-hidden="true"
              onClick={onClose}
              onKeyDown={onClose}
              src={close}
              alt="close"
            />
          </div>
          <div>
            <label htmlFor="job_select">
              <select
                required
                id="job_select"
                name="job_id"
                onChange={handleChange}
                autoComplete="on"
                className="modalCrud-title"
                disabled={disabled}
              >
                <option value="">{dataOffer.title}</option>
                {jobs.map((job) => (
                  <option value={Number(job.id)}>{job.job_title}</option>
                ))}
              </select>
            </label>
            {disabled ? (
              <button
                onClick={modifyOffer}
                type="submit"
                className="postule-button"
              >
                {" "}
                Modifier l'annonce{" "}
              </button>
            ) : (
              <button
                onClick={confirmModification}
                type="submit"
                className="postule-button"
                style={{ color: "red" }}
              >
                {" "}
                Confirmer la modification{" "}
              </button>
            )}
            <div className="header-img">
              <p>
                {"   Offre publiée le "}{" "}
                {new Date(dataOffer.date).toLocaleDateString()}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="modalCrud-body">
          {formOffer.map(
            (input) =>
              dataOffer[input.name] && (
                <div>
                  <h2 className="modalCrud-subtitle">{input.title}</h2>
                  <textarea
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    className="modalCrud-input"
                    value={infosOffer[input.name]}
                    onChange={handleChange}
                    disabled={disabled}
                  />
                </div>
              )
          )}
          <h2 className="modalCrud-subtitle">Expérience requise</h2>
          <label htmlFor="experience_select">
            <select
              required
              id="experience_select"
              name="experience_id"
              onChange={handleChange}
              autoComplete="on"
              disabled={disabled}
            >
              <option disabled selected value>
                {dataOffer.experience}
              </option>
              {experiences.map((experience) => (
                <option value={experience.id}>{experience.experience}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="modalCrud-footer">
          <p className="send-candidature">{deleteMessage}</p>

          {deleteMessage === "" &&
            (confirmDelete ? (
              <div>
                <p className="send-candidature">
                  Etes vous sûr de vouloir supprimer cette offre ?
                </p>
                <div>
                  <button
                    onClick={() => {
                      deleteOffer();
                    }}
                    type="submit"
                    className="postule-button"
                    style={{ color: "red" }}
                  >
                    {" "}
                    Je confirme{" "}
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDelete(false);
                    }}
                    type="submit"
                    className="postule-button"
                  >
                    {" "}
                    Annuler{" "}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  askConfirmDelete();
                }}
                type="submit"
                className="postule-button"
                style={{ color: "red" }}
              >
                {" "}
                Supprimer l'annonce{" "}
              </button>
            ))}
        </div>
      </div>
    </div>,
    document.getElementById("app")
  );
};

OfferCrud.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
};

export default OfferCrud;
