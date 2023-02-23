import PropTypes from "prop-types";
import socketIO from "socket.io-client";
import React from "react";
import ChatBodyCandidat from "./ChatBodyCandidat";
import "../styles/Chat.css";

const ChatCandidat = () => {
  const socket = socketIO.connect(import.meta.env.VITE_BACKEND_URL_FORCHAT);
  return (
    <div className="my_inbox_box_container">
      <div className="my_inbox_titleblock">
        <h2 className="my_inbox_title">Ma messagerie</h2>
      </div>
      <div className="my_inbox_body">
        <div className="chatMain">
          <ChatBodyCandidat socket={socket} />
        </div>
      </div>
    </div>
  );
};
export default ChatCandidat;
ChatCandidat.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  socket: PropTypes.objectOf.isRequired,
};
