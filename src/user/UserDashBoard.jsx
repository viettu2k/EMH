import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import moment from "moment";
import { API } from "../config";
import DefaultAvatar from "../images/avatar.jpg";

const UserDashboard = () => {
  const {
    user: {
      _id,
      name,
      email,
      role,
      dob,
      address,
      phoneNumber,
      histories,
      members,
    },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/family-member">
              Add Family Member
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">User Information</h4>
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
        <h4 className="card-header">Vaccination history</h4>
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
          {histories.length === 0 && (
            <li className="list-group-item">
              You don't register any vaccination schedule!
            </li>
          )}
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

  return (
    <Layout
      title="Dashboard"
      description="User Dashboard"
      className="container"
    >
      <div className="row">
        <div className="col-4">
          {userAvatar()}
          {userLinks()}
        </div>
        <div className="col-8">
          {userInfo()}
          {vaccinationHistory()}
          {familyMembers()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
