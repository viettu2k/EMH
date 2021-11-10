import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCenter } from "./apiCore";
import { API } from "../config";

export default function Center(props) {
  const [center, setCenter] = useState({});
  const [error, setError] = useState(false);

  const loadSingleCenter = (centerId) => {
    getCenter(centerId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
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
            <div className="col-md-4">
              <img
                style={{ height: "250px", width: "auto" }}
                className="img-fluid rounded border border-primary"
                src={`${API}/centers/photo/${center._id}`}
                alt={center.name}
              />
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
