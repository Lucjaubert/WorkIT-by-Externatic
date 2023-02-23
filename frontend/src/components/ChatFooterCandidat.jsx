import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";

const ChatFooterCandidat = ({ socket, setTypingMessage }) => {
  const [message, setMessage] = useState("");
  const isTyping = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      socketID: socket.id,
      message,
    });
    setMessage("");
  };

  let timeOut;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(timeOut);
      handleSendMessage(e);
      socket.emit("typing", { typing: false });
      isTyping.current.style.display = "none";
    } else {
      socket.emit("typing", { typing: true });
      clearTimeout(timeOut);
      isTyping.current.style.display = "block";
      isTyping.current.style.fontSize = "14px";
      isTyping.current.style.color = "grey";
      isTyping.current.style.marginLeft = "3vw";
      timeOut = setTimeout(() => {
        socket.emit("typing", { typing: false });
        isTyping.current.style.display = "none";
      }, 4000);
    }
  };

  useEffect(() => {
    socket.on("isTyping", (data) => {
      setTypingMessage(data);
    });
  }, [socket]);

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

ChatFooterCandidat.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    id: PropTypes.string,
  }).isRequired,
  setTypingMessage: PropTypes.func.isRequired,
};
export default ChatFooterCandidat;
