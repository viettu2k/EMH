import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCenters } from "../staff/apiStaff";
import { API } from "../config";
import Layout from "./Layout";
// import DefaultProfile from "../images/avatar.jpg";

export default function Centers() {
  const [values, setValues] = useState({
    centers: [],
    error: "",
  });

  const { centers, error } = values;

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

  const renderCenters = (centers) => (
    <div className="row">
      {centers.map((center, i) => (
        <div className="card col-md-4" key={i}>
          <img
            style={{ height: "250px", width: "auto" }}
            className="img-thumbnail"
            src={`${API}/centers/photo/${center._id}`}
            alt={center.name}
          />
          <div className="card-body">
            <h5 className="card-title">{center.name}</h5>
            <Link
              to={`/centers/${center._id}`}
              className="btn btn-raised btn-primary btn-sm"
            >
              View Detail
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

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
      title="Medical Centers"
      description="Medical Center list in Da Nang City"
      className="container-fluid"
    >
      {showError()}
      {renderCenters(centers)}
    </Layout>
  );
}
