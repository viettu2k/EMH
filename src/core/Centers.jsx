import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCenters } from "./apiCore";
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
        <div className="card col-md-4 border border-secondary" key={i}>
          <img
            style={{ height: "250px", width: "auto" }}
            className="img-thumbnail rounded border border-primary"
            src={`${API}/user/photo/${center._id}`}
            alt={center.name}
          />
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h5 className="card-title">{center.name}</h5>
              </div>
              <div className="col">
                <Link
                  to={`/centers/${center._id}`}
                  className="btn btn-raised btn-primary btn-sm"
                >
                  View Detail
                </Link>
              </div>
            </div>
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
      description="The list of the medical centers in Da Nang City"
      className="container"
    >
      {showError()}
      {renderCenters(centers)}
    </Layout>
  );
}
