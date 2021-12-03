import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import moment from "moment";
import { API } from "../config";
import DefaultAvatar from "../images/avatar.jpg";

export default function AdminDashboard() {
  const {
    user: { _id, name, email, role, dob, address, phoneNumber },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/users">
              User Management
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/center">
              Add Medical Center
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          {dob && (
            <li className="list-group-item">
              Birth Date: {moment(dob).format("DD/MM/YYYY")}
            </li>
          )}
          {address && <li className="list-group-item">Address: {address}</li>}
          {phoneNumber && (
            <li className="list-group-item">Phone Number: {phoneNumber}</li>
          )}
          <li className="list-group-item">
            {role === 1
              ? "Medical Staff"
              : role === 2
              ? "Medical Center"
              : role === 3
              ? "Admin"
              : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const userAvatar = () => {
    const photoUrl = _id
      ? `${API}/user/photo/${_id}?${new Date().getTime()}`
      : DefaultAvatar;
    return (
      <div className="card mb-5">
        <h3 className="card-header">Avatar</h3>
        <img
          style={{ height: "250px", width: "auto" }}
          className="img-thumbnail rounded border border-primary"
          src={photoUrl}
          onError={(i) => (i.target.src = `${DefaultAvatar}`)}
          alt={name}
        />
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-4">
          {userAvatar()}
          {adminLinks()}
        </div>
        <div className="col-8">{adminInfo()}</div>
      </div>
    </Layout>
  );
}
