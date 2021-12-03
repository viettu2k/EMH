import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import moment from "moment";
import { API } from "../config";
import { isAuthenticated } from "../auth";
import { getPublicProfile } from "./apiUser";
import DefaultAvatar from "../images/avatar.jpg";

const UserDashboard = ({ match }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const loadProfile = (userId) => {
    getPublicProfile(userId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log(data);
        setUser(data);
      }
    });
  };

  useEffect(
    () => {
      const userId = match.params.userId;
      loadProfile(userId);
    },
    // eslint-disable-next-line
    []
  );

  const {
    _id,
    name,
    email,
    role,
    dob,
    address,
    phoneNumber,
    histories,
    members,
    references,
  } = user;

  const userInfo = () => {
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

  const vaccinationHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Vaccination history</h3>
        <ul className="list-group">
          {histories &&
            histories.map((h, i) => (
              <li key={i} className="list-group-item">
                <div className="row">
                  <div className="col">
                    <Link to={`/vaccinations/${h.vaccinationId}`}>
                      {i + 1}. {h.vaccinationName}
                    </Link>
                  </div>
                  <div className="text-center">
                    {!h.status ? (
                      <i
                        style={{ color: "red" }}
                        className="fas fa-lg fa-window-close"
                      />
                    ) : (
                      <i
                        style={{ color: "green" }}
                        className="fas fa-lg fa-check-square"
                      />
                    )}
                  </div>
                  <div className="text-center col">{h.vaccineName}</div>
                  <div className="col-md-5">
                    {`${moment(h.vaccinationTime).format("LLL")}`}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const familyMembers = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Family Members</h3>
        <ul className="list-group">
          {members &&
            members.map((m, i) => (
              <li key={i} className="list-group-item">
                <Link
                  to={`/public-profile/${m.id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  {m.name}
                </Link>
              </li>
            ))}
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

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <Layout title="Profile" description="" className="container">
      {showError()}
      <div className="row">
        <div className="col-4">{userAvatar()}</div>
        <div className="col-8">
          {userInfo()}
          {isAuthenticated().user.role >= 1 ||
          references === isAuthenticated().user._id ? (
            <>
              {vaccinationHistory()} {familyMembers()}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
