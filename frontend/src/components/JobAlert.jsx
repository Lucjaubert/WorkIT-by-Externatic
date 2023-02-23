import { React, useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext";
import "../styles/JobAlert.css";
import { GetMyUserAlerts, DeleteMyUserAlert } from "../apis/userAlertApi";
import notificationAlert from "../assets/img/notification-alert.png";
import deleteButton from "../assets/img/delete-button.png";
import AlertModal from "../modals/AlertModal";

const JobAlert = () => {
  const { auth } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(0);

  const [alerts, setAlerts] = useState([]);
  const getAllMyAlerts = async () => {
    // eslint-disable-next-line no-unused-expressions
    auth.data &&
      (await GetMyUserAlerts(auth.data.id).then((res) => {
        setAlerts(res.data);
      }));
  };
  useEffect(() => {
    getAllMyAlerts();
  }, [reload]);

  const handleDelete = (id) => {
    DeleteMyUserAlert(id).then((res) => {
      if (res.status === 200) {
        getAllMyAlerts();
      }
    });
  };

  return (
    <div className="bloc_alert">
      <div className="create_new_alert">
        <button
          type="button"
          className="create_new_alert_button"
          onClick={() => {
            setShow(true);
          }}
        >
          {" "}
          Créer une nouvelle alerte{" "}
        </button>
      </div>
      {alerts.map((alert) => (
        <div className="alert_block" key={alert.id}>
          <img
            src={notificationAlert}
            role="presentation"
            alt="logo notification alert"
            className="alert_logo"
          />
          <div className="alert_body">
            <p id="job_title">{alert.job_title}</p>
            <p id="job_location">{alert.city}</p>
            <div className="offer_block_options">
              <div className="delete_option">
                <img src={deleteButton} alt="bouton supprimer" />
                <button
                  type="submit"
                  onClick={() => handleDelete(alert.userAlert_id)}
                >
                  Supprimer
                </button>
              </div>
              <AlertModal
                show={show}
                setShow={setShow}
                onClose={() => {
                  setShow(false);
                  setReload(reload + 1);
                }}
                reload={reload}
                setReload={setReload}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobAlert;
