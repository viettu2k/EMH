import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { URL } from "../config";
import TextContainer from "./TextContainer";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Layout from "./Layout";
import { isAuthenticated } from "../auth";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = `${URL}`;
  console.log(URL);

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
          <div className="card bg-primary">
            <h4 className="card-header text-light">Room chat by {room}</h4>
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
