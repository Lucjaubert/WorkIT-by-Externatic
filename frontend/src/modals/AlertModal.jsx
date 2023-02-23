import { React, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { GetAllJobs, GetJobById } from "../apis/jobApi";
import { AddUserAlert } from "../apis/userAlertApi";
import { authContext } from "../context/AuthContext";
import notificationAlert from "../assets/img/notification-alert.png";
import modifyButton from "../assets/img/modify-button.png";

const AlertModal = ({ show, onClose, reload, setReload }) => {
  if (!show) {
    return null;
  }
  const { auth } = useContext(authContext);
  const [jobs, setJobs] = useState([]);
  const [infosOffer, setInfosOffer] = useState({});

  const loadJobs = () => {
    GetAllJobs().then((res) => {
      setJobs(res.data);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInfosOffer({ ...infosOffer, [e.target.name]: e.target.value });
  };

  const createMyAlert = (e) => {
    e.preventDefault();
    AddUserAlert(auth.data.id, infosOffer.job_id, infosOffer.city).then(
      (res) => {
        if (res.status === 200) {
          console.warn("alerte créée");
          onClose();
          setReload(reload + 1);
        }
      }
    );
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    infosOffer.job_id &&
      GetJobById(infosOffer.job_id).then((res) => {
        setInfosOffer({ ...infosOffer, title: res.data.job_title });
      });
  }, [infosOffer.job_id]);

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div
      className="modalCrudBox"
      onClick={onClose}
      onKeyDown={onClose}
      role="textbox"
      tabIndex={0}
    >
      <div
        role="textbox"
        className="smallModalCrudContent"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <div className="alert_block" key={alert.id}>
          <img
            src={notificationAlert}
            role="presentation"
            alt="logo notification alert"
            className="alert_logo"
          />
          <div className="alert_body">
            <label htmlFor="job_select">
              <select
                required
                id="job_select"
                name="job_id"
                onChange={handleChange}
                autoComplete="on"
                className="modalCrud-title"
              >
                <option value="">{infosOffer.title}</option>
                {jobs.map((job) => (
                  <option value={Number(job.id)}>{job.job_title}</option>
                ))}
              </select>
            </label>
            <div>
              <input
                type="text"
                name="city"
                placeholder="Ville"
                className="modalCrud-input"
                value={infosOffer.name}
                onChange={handleChange}
              />
            </div>

            <p id="job_location">{infosOffer.city}</p>
            <div className="offer_block_options">
              <div className="modify_option">
                <img src={modifyButton} alt="bouton modifier" />
                <button type="submit" onClick={(e) => createMyAlert(e)}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

AlertModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reload: PropTypes.number.isRequired,
  setReload: PropTypes.func.isRequired,
};
