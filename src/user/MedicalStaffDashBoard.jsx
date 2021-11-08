import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

export default function MedicalStaffDashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const staffLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Medical Staff Links</h4>
        <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${_id}`}>
            Update Profile
          </Link>
        </li>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/search/user">
              Search user
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/vaccination">
              Create Vaccination
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/test">
              Create Test
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const staffInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1
              ? "Medical Staff"
              : role === 2
              ? "Admin"
              : "Registered User"}
          </li>
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
        <div className="col-3">{staffLinks()}</div>
        <div className="col-9">{staffInfo()}</div>
      </div>
    </Layout>
  );
}
