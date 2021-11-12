import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getVaccination } from "./apiCore";
import { Link } from "react-router-dom";

export default function Vaccination(props) {
  const [vaccination, setVaccination] = useState({});
  const [error, setError] = useState(false);

  const loadSingleVaccination = (vaccinationId) => {
    getVaccination(vaccinationId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setVaccination(data);
      }
    });
  };

  useEffect(
    () => {
      const vaccinationId = props.match.params.vaccinationId;
      loadSingleVaccination(vaccinationId);
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

  const goBack = () => (
    <div className="mt-5">
      <Link to="/" className="text-warning">
        Back to Homepage
      </Link>
    </div>
  );

  return (
    <Layout
      title={vaccination && vaccination.name}
      description={
        vaccination &&
        vaccination.participants &&
        vaccination.participants.length === vaccination.limit
          ? "Status: Full"
          : "Status: Available"
      }
      className="container-fluid"
    >
      <div className="row">
        {vaccination && (
          <>
            <div className="col-md-8">
              <div className="lead mt-2">
                <p>{vaccination.name}</p>
                <p>Type: {vaccination.type}</p>
                <p>Address: {vaccination.address}</p>
                <p>Limit: {vaccination.limit}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {showError()}
      {goBack()}
    </Layout>
  );
}
