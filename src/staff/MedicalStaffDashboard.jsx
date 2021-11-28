import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listByMedicalStaff } from "./apiStaff";
import moment from "moment";

export default function MedicalStaffDashboard() {
  const {
    token,
    user: { _id, name, email, role, dob, address, phoneNumber },
  } = isAuthenticated();

  const [vaccinations, setVaccinations] = useState([]);

  const init = () => {
    listByMedicalStaff(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setVaccinations(data);
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

  const staffLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Medical Staff Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/vaccination">
              Create Vaccination Schedule
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

  const myVaccination = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Vaccination Schedule Management</h3>
        <ul className="list-group">
          {vaccinations &&
            vaccinations.map((v, i) => {
              return (
                <li key={i} className="list-group-item list-group-item-action">
                  <Link to={`/vaccinations/${v._id}`}>{v.name}</Link>
                </li>
              );
            })}
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
        <div className="col-4">{staffLinks()}</div>
        <div className="col-8">
          {staffInfo()}
          {myVaccination()}
        </div>
      </div>
    </Layout>
  );
}
