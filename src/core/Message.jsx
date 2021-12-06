import React from "react";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="chat-message-right mb-4">
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
        <p className="font-weight-bold mb-1">{trimmedName}</p>
        <p>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="chat-message-left pb-4">
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <p className="font-weight-bold mb-1">{user}</p>
        <p>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default Message;
