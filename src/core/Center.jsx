import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCenter } from "./apiCore";
import { API } from "../config";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

export default function Center(props) {
  const [center, setCenter] = useState({});
  const [error, setError] = useState(false);

  const loadSingleCenter = (centerId) => {
    getCenter(centerId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setCenter(data);
      }
    });
  };

  useEffect(
    () => {
      const centerId = props.match.params.centerId;
      loadSingleCenter(centerId);
    },
    // eslint-disable-next-line
    []
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
      title={center && center.name}
      description={
        center &&
        center.description &&
        // center.description.substring(0, 100).concat("...")
        center.description
      }
      className="container-fluid"
    >
      <div className="row">
        {center && (
          <>
            <div className="card col-md-4 border-secondary">
              <img
                style={{ height: "250px", width: "auto" }}
                className="img-fluid rounded border border-primary"
                src={`${API}/centers/photo/${center._id}`}
                alt={center.name}
              />

              {isAuthenticated() && isAuthenticated().user.role === 2 && (
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    Edit/Delete as an Admin
                  </h5>
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/update/center/${props.match.params.centerId}`}
                  >
                    Edit Center
                  </Link>
                </div>
              )}
            </div>
            <div className="col-md-8">
              <div className="lead mt-2">
                <p>{center.name}</p>
                <p>{center.description}</p>
                <p>Address: {center.address}</p>
                <p>Hotline: {center.phoneNumber}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {showError()}
    </Layout>
  );
}
