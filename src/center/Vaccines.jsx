import React, { useState, useEffect } from "react";
import { getVaccinesByCenter } from "./apiCenter";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

export default function Vaccines() {
  const [values, setValues] = useState({
    vaccines: [],
    error: "",
  });
  const {
    token,
    user: { _id },
  } = isAuthenticated();

  const { vaccines, error } = values;

  const init = () => {
    getVaccinesByCenter(_id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, vaccines: data });
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

  const renderVaccines = (vaccines) => (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Quantity</th>
          <th scope="col">Consumed</th>
          <th scope="col">Time Consuming (Months)</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {vaccines &&
          vaccines.map((v, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{v.name}</td>
                <td>{v.type}</td>
                <td>{v.quantity}</td>
                <td>{v.consumed}</td>
                <td>{v.timeConsuming}</td>
                <td>
                  <Link
                    to={`/vaccines/${v._id}/${_id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                </td>
                <td></td>
              </tr>
            );
          })}
      </tbody>
    </table>
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
    <div className="container">
      <h2 className="mt-5 mb-5">
        {!vaccines.length ? "No more vaccine!" : "Recent vaccine!"}
      </h2>
      {renderVaccines(vaccines)}
      {showError()}
    </div>
  );
}
