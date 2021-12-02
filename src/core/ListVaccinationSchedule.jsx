import React, { useState, useEffect } from "react";
import { getVaccinations } from "./apiCore";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Vaccinations() {
  const [values, setValues] = useState({
    vaccinations: [],
    error: "",
  });

  const { vaccinations, error } = values;

  const compareDate = (vaccineDate) => {
    let ms = Date.now();
    let date = new Date(vaccineDate);
    return ms > date;
  };

  const init = () => {
    getVaccinations().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, vaccinations: data });
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

  const renderVaccinations = (vaccinations) => (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col"> # </th>
          <th scope="col"> Name </th>
          <th className="text-center" scope="col">
            Status
          </th>
          <th scope="col"> Vaccination time </th>
          <th scope="col"> Address </th>
          <th className="text-center" scope="col">
            View
          </th>
        </tr>
      </thead>
      <tbody>
        {vaccinations &&
          vaccinations.map((v, i) => {
            return (
              <tr key={i}>
                <th scope="row"> {i + 1} </th>
                <td> {v.name} </td>
                <td className="text-center">
                  {v.participants.length === v.limit &&
                  !compareDate(v.vaccineDate) ? (
                    <i
                      style={{ color: "red" }}
                      className="fas fa-lg fa-window-close"
                    />
                  ) : (
                    <i
                      style={{ color: "green" }}
                      className="fas fa-lg fa-check-square"
                    />
                  )}
                </td>
                <td> {moment(v.vaccineDate).format("lll")} </td>
                <td> {v.address} </td>
                <td className="text-center">
                  <Link
                    to={`/vaccinations/${v._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Detail
                  </Link>
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
      <h2 className="mt-5 mb-5">
        {!vaccinations.length
          ? "No more vaccination schedule!"
          : "Recent vaccination schedule!"}
      </h2>
      {renderVaccinations(vaccinations)} {showError()}
    </div>
  );
}
