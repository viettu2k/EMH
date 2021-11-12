import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getVaccination } from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DeleteVaccination from "./DeleteVaccination";

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
            <div className="card col-md-3 border-secondary">
              {isAuthenticated() && isAuthenticated().user.role >= 1 && (
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    Edit/Delete{" "}
                    {`${
                      isAuthenticated().user.role === 1 ? "" : "as an Admin"
                    }`}
                  </h5>
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/update/vaccination/${props.match.params.vaccinationId}`}
                  >
                    Edit Vaccination Schedule
                  </Link>
                  <DeleteVaccination vaccinationId={vaccination._id} />
                </div>
              )}
            </div>
            <div className="col-md-5">
              <div className="lead mt-2">
                <p>{vaccination.name}</p>
                <p>Type: {vaccination.type}</p>
                <p>Address: {vaccination.address}</p>
                <p>Limit: {vaccination.limit}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="lead mt-2">
                <h4>Participants</h4>
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item">Number 1</li>
                </ol>
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
