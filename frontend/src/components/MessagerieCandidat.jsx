import React from "react";
import PropTypes from "prop-types";
import socketIO from "socket.io-client";
import ChatBody from "./ChatBodyCandidat";
import "../styles/MessagerieCandidat.css";

const MessagerieCandidat = () => {
  const socket = socketIO.connect(import.meta.env.VITE_BACKEND_URL_FORCHAT);

  return (
    <div className="messagerie-candidat">
      <div className="flex flex-fd-column flex-ai-center flex-jc-center">
        <div className="box box_candidate">
          <div className="box_candidate_title">
            <h1>Messagerie</h1>
          </div>
          <div className="box_candidate_body">
            <ChatBody socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagerieCandidat;

MessagerieCandidat.propTypes = {
  socket: PropTypes.shape({
    id: PropTypes.string,
    on: PropTypes.func,
  }).isRequired,
};
