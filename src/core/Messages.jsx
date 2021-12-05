import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

// import "./Messages.css";

const Messages = ({ messages, name }) => (
  <div className="position-relative">
    <ScrollToBottom className="chat-messages p-4">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  </div>
);

export default Messages;
