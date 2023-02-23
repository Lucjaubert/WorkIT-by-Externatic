/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { GetFirmData } from "../apis/firmApi";
import { GetAllJobs, GetJobById } from "../apis/jobApi";
import { GetAllExperiences } from "../apis/experienceApi";
import { GetUserAlerts } from "../apis/userAlertApi";
import { LaunchAlerts } from "../apis/alertApi";
import { PostOffer } from "../apis/offerApi";
import formOffer from "../utils/formOffer";
import close from "../assets/img/annuler.png";
import "../styles/ModalCrud.css";

const OfferForm = ({ show, onClose, firmId }) => {
  if (!show) {
    return null;
  }
  const [firmData, setFirmData] = useState([]);
  const [dataOffer, setDataOffer] = useState({});
  const [jobs, setJobs] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [published, setPublished] = useState();
  const [userAlerts, setUserAlerts] = useState([]);

  const GetAlerts = async () => {
    await GetUserAlerts(dataOffer.job_id, dataOffer.firm_city).then((res) =>
      setUserAlerts(res.data)
    );
  };

  const getFirmData = async () => {
    await GetFirmData(firmId).then((res) => setFirmData(res.data));
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

  const handleChange = (e) => {
    e.preventDefault();
    setDataOffer({ ...dataOffer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getFirmData();
    loadJobs();
    loadExperiences();
  }, []);

  useEffect(() => {
    firmData &&
      setDataOffer({
        ...dataOffer,
        firm_id: firmData.id,
      });
  }, [firmData]);

  useEffect(() => {
    dataOffer.job_id && dataOffer.firm_city && GetAlerts();
  }, [dataOffer.job_id, dataOffer.firm_city]);

  useEffect(() => {
    dataOffer.job_id &&
      GetJobById(dataOffer.job_id).then((res) => {
        setDataOffer({ ...dataOffer, title: res.data.job_title });
      });
  }, [dataOffer.job_id]);

  const postOffer = (e) => {
    e.preventDefault();
    PostOffer(dataOffer)
      .then((res) => {
        if (res.status === 200) {
          setPublished("Votre offre a bien été publiée");
          userAlerts.forEach((user) => {
            LaunchAlerts(user.user_id, res.data.insertId)
              .then((response) => {
                console.warn(response.data);
              })
              .catch((err) => {
                console.warn(err);
              });
          });
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return ReactDOM.createPortal(
    <form onSubmit={postOffer}>
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
              <img src={firmData.logo_url} alt="" width="8%" />
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
              <h1 className="modalCrud-title"> Titre </h1>
              <label htmlFor="job_select">
                <select
                  required
                  id="job_select"
                  name="job_id"
                  onChange={handleChange}
                  autoComplete="on"
                  className="modalCrud-title"
                >
                  <option value="">Titre</option>
                  {jobs.map((job) => (
                    <option value={Number(job.id)}>{job.job_title}</option>
                  ))}
                </select>
              </label>
              <div className="header-img" />
            </div>
          </div>

          <div className="modalCrud-body">
            {formOffer.map((input) => (
              <div>
                <h2 className="modalCrud-subtitle">{input.title}</h2>
                <textarea
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  className="modalCrud-input"
                  value={dataOffer[input.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <h2 className="modalCrud-subtitle">Expérience requise</h2>
            <label htmlFor="experience_select">
              <select
                required
                id="experience_select"
                name="experience_id"
                onChange={handleChange}
                autoComplete="on"
              >
                <option disabled selected value>
                  Experience requise
                </option>
                {experiences.map((experience) => (
                  <option value={experience.id}>{experience.experience}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="modalCrud-footer">
            <p className="send-candidature">{published}</p>
            {published ? null : (
              <button
                onClick={postOffer}
                type="submit"
                className="postule-button"
              >
                {" "}
                Publier l'annonce{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>,
    document.getElementById("app")
  );
};

OfferForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  firmId: PropTypes.number.isRequired,
};

export default OfferForm;
