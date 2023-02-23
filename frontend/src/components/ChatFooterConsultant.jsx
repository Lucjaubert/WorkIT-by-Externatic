import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import "../styles/Chat.css";

const ChatFooterConsultant = ({ socket }) => {
  const [message, setMessage] = useState("");
  const { auth } = useContext(authContext);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      image: auth.data.image,
      userName: auth.data.lastname,
      socketID: socket.id,
      message,
    });
    setMessage("");
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      socket.emit("sendMessage", {
        userName: auth.data.lastname,
        socketID: socket.id,
        message,
      });
      setMessage("");
    }
  };
  return (
    <div className="chat__footer">
      <input
        type="text"
        placeholder="Ecrire un message"
        className="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        type="button"
        className="chat_sendBtn"
        onClick={handleSendMessage}
      >
        Envoyer
      </button>
    </div>
  );
};
ChatFooterConsultant.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    id: PropTypes.string,
  }).isRequired,
};
export default ChatFooterConsultant;
