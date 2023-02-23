import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ChatFooter from "./ChatFooterCandidat";
import "../styles/Chat.css";

const ChatBody = ({ socket }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    socket.on("newMessage", (messages) => {
      setChatMessages([...chatMessages, messages]);
    });
  }, [chatMessages]);
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
            <div className="message__recepted__chats">
              <p>{message.userName}Votre interlocuteur</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="chat_footer">
        <ChatFooter
          socket={socket}
          setTypingMessage={setTypingMessage}
          typingMessage={typingMessage}
        />
      </div>
    </div>
  );
};
ChatBody.propTypes = {
  socket: PropTypes.shape({
    id: PropTypes.string,
    on: PropTypes.func,
  }).isRequired,
};
export default ChatBody;
