import socketIO from "socket.io-client";
import React from "react";
import ChatBodyConsultant from "./ChatBodyConsultant";
import ChatBarConsultant from "./ChatBarConsultant";
import "../styles/ChatConsultant.css";

const ChatConsultant = () => {
  const socket = socketIO.connect(import.meta.env.VITE_BACKEND_URL_FORCHAT);
  return (
    <div className="consultant_chat_box_container">
      <div className="consultant_chat_titleblock">
        <h2 className="consultant_chat_title">Ma messagerie</h2>
      </div>
      <div className="consultant_chat_main">
        <div>
          <ChatBarConsultant socket={socket} />
        </div>
        <div className="consultant_chat_body">
          <ChatBodyConsultant socket={socket} />
        </div>
      </div>
    </div>
  );
};
export default ChatConsultant;
