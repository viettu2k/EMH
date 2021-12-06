import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { URL } from "../config";
import TextContainer from "./TextContainer";
import Messages from "./Messages";
import Input from "./Input";
import Layout from "./Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = `${URL}`;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    const userId = isAuthenticated().user._id;

    socket = io(ENDPOINT, { transports: ["websocket"] });

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room, userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <Layout title="Chat room" description="" className="container">
      <div className="row">
        <div
          style={{ padding: "0px" }}
          className="col-8 border border-secondary mb-0"
        >
          <div className="list-group-item bg-primary text-light">
            <div className="row">
              <div className="col">
                <h3>Room chat by {room}</h3>
              </div>
              <Link to="/join-chat">
                <i className="fas fa-2x fa-window-close pointer text-light"></i>
              </Link>
            </div>
          </div>
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        <div className="col-4">
          <TextContainer users={users} />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
