import React from "react";

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="flex-grow-0 py-3 px-4 border-top">
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button
        className="btn btn-success btn-send"
        onClick={(e) => sendMessage(e)}
      >
        Send
      </button>
    </div>
  </div>
);

export default Input;
