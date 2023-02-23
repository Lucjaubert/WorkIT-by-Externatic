import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ChatFooterConsultant from "./ChatFooterConsultant";
import "../styles/Chat.css";

const ChatBodyConsultant = ({ socket }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setChatMessages([...chatMessages, message]);
    });
  }, [socket]);

  return (
    <div className="chat_box_container">
      <div className="message__container">
        {chatMessages.map((message) =>
          message.socketID === socket.id ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">Vous</p>
              <div className="message__sender">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div className="message__recepted__chats" key={message.id}>
              <p className="sender__name">{message.username}</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="chat_footer">
        <ChatFooterConsultant
          socket={socket}
          setTypingMessage={setTypingMessage}
          typingMessage={typingMessage}
        />
      </div>
    </div>
  );
};

ChatBodyConsultant.propTypes = {
  socket: PropTypes.shape({
    id: PropTypes.string,
    on: PropTypes.func,
  }).isRequired,
};

export default ChatBodyConsultant;
