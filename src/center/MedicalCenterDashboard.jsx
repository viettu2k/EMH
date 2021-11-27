import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import moment from "moment";

export default function MedicalCenterDashboard() {
  const {
    user: {
      _id,
      name,
      email,
      description,
      role,
      dob,
      address,
      phoneNumber,
      members,
    },
  } = isAuthenticated();

  const centerLinks = () => {
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
            <Link className="nav-link" to="/create/staff">
              Add Medical Staff
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/vaccines/${_id}`}>
              Vaccine management
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/vaccine">
              View statistics
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const centerInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Medical Center Information</h3>
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
            <li className="list-group-item">Hotline: {phoneNumber}</li>
          )}
          {description && (
            <li className="list-group-item">Description: {description}</li>
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

  const listMembers = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">List Medical Staff</h3>
        <ul className="list-group">
          {members &&
            members.map((m, i) => (
              <li key={i} className="list-group-item">
                <Link
                  to={`/users/${m.id}`}
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

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{centerLinks()}</div>
        <div className="col-9">
          {centerInfo()}
          {listMembers()}
        </div>
      </div>
    </Layout>
  );
}
