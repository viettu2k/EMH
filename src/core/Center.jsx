import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCenter } from "./apiCore";

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
      <div className="row"></div>
      {showError()}
    </Layout>
  );
}
