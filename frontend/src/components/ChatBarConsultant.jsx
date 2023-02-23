import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import consultantprofil from "../assets/img/consultantprofil.png";
import "../styles/ChatConsultant.css";

const ChatBarConsultant = ({ socket }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    socket.on("newUser", (newUser) => {
      setUser([...user, newUser]);
    });
  }, [user]);

  return (
    <div className="consultant_chat__sidebar">
      <div className="consultant__chat__bar">
        <h4 className="consultant_chat__header">Candidats actifs</h4>
        <div className="consultant_chat__users">
          {user.map((el) => (
            <div
              className="consultant_chat__user"
              key={el.id || el.lastname + el.firstname}
            >
              {el.role === "consultant" ? (
                <img src={consultantprofil} alt="consultant profile" />
              ) : (
                <img src={el.userprofil} alt="user profile" />
              )}
              <p className="consultant_p__chat__bar">
                {el.lastname}&#160;
                {el.firstname}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ChatBarConsultant.propTypes = {
  socket: PropTypes.objectOf.isRequired,
  on: PropTypes.func.isRequired,
};

export default ChatBarConsultant;
