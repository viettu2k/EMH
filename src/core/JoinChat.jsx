import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { isAuthenticated } from "../auth";
import { getCenters } from "./apiCore";

// import "./Join.css";

export default function SignIn() {
  const [values, setValues] = useState({
    name: isAuthenticated().user.name,
    centers: [],
    room: "",
    error: "",
  });

  const { name, centers, room, error, hasJoined } = values;

  const init = () => {
    getCenters().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, centers: data });
      }
    });
  };

  useEffect(
    () => {
      init();
    },
    // eslint-disable-next-line
    []
  );

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const joinForm = () => {
    return (
      <div style={{ display: hasJoined === false ? "" : "none" }}>
        <form className="mb-3">
          <h1 className="heading">Join Chat</h1>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Room</label>
            <select onChange={handleChange("room")} className="form-control">
              <option>Please select room</option>
              {centers &&
                centers.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat-room?name=${name}&room=${room}`}
          >
            <button className="btn btn-outline-primary" type="submit">
              Join
            </button>
          </Link>
        </form>
      </div>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <Layout
      title="Home Page"
      description="ELECTRONIC MEDICAL HANDBOOK"
      className="container"
    >
      {showError()}
      {joinForm()}
    </Layout>
  );
}
