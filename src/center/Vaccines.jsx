import React, { useState, useEffect } from "react";
import { getVaccinesByCenter } from "./apiCenter";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DeleteVaccine from "./DeleteVaccine";

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
          <th className="text-center" scope="col">
            Type
          </th>
          <th className="text-center" scope="col">
            Quantity
          </th>
          <th className="text-center" scope="col">
            Consumed
          </th>
          <th className="text-center" scope="col">
            Time Consuming (Months)
          </th>
          <th className="text-center" scope="col">
            Edit
          </th>
          <th className="text-center" scope="col">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {vaccines &&
          vaccines.map((v, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{v.name}</td>
                <td className="text-center">{v.type}</td>
                <td className="text-center">{v.quantity}</td>
                <td className="text-center">{v.consumed}</td>
                <td className="text-center">{v.timeConsuming}</td>
                <td className="text-center">
                  <Link
                    to={`/vaccines/${v._id}/${_id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <DeleteVaccine vaccineId={v._id} />
                </td>
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
      <h2 className="mt-5 mb-2">
        {!vaccines.length ? "No more vaccine!" : "Recent vaccine!"}
      </h2>
      <Link
        to={`/create/vaccine`}
        className="btn btn-raised btn-success btn-sm mb-1"
      >
        <h6>Add a new Vaccine</h6>
      </Link>
      {renderVaccines(vaccines)}
      {showError()}
    </div>
  );
}
