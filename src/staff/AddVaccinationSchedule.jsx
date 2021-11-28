import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {
  createVaccinationSchedule,
  getVaccinesByCenter,
  updateVaccine,
} from "./apiStaff";

const AddVaccinationSchedule = () => {
  const [values, setValues] = useState({
    name: "",
    vaccine: {},
    notes: "",
    address: "",
    limit: "",
    vaccines: [],
    ownership: "",
    loading: false,
    error: "",
    createdVaccination: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    // vaccine,
    notes,
    address,
    limit,
    vaccineDate,
    vaccines,
    loading,
    error,
    createdVaccination,
  } = values;

  // load categories and set form data
  const init = () => {
    getVaccinesByCenter(user.references, token).then((data) => {
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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const getIndex = (array, id) => {
    let temp = 0;
    array.forEach((element, i) => {
      if (element["_id"] === id) {
        temp = i;
      }
    });
    return temp;
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    const { name, vaccine, notes, address, limit } = values;
    let index = getIndex(vaccines, vaccine);

    updateVaccine(vaccine, user.references, token, {
      consumed: vaccines[index].consumed + parseInt(limit),
      quantity: vaccines[index].quantity - parseInt(limit),
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
    });
    createVaccinationSchedule(user._id, token, {
      name,
      vaccine,
      notes,
      address,
      limit,
      vaccineDate,
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          vaccine: "",
          limit: "",
          notes: "",
          address: "",
          centers: "",
          vaccineDate: "",
          loading: false,
          createdVaccination: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Vaccine</label>
        <select onChange={handleChange("vaccine")} className="form-control">
          <option>Please select</option>
          {vaccines &&
            vaccines.map((v, i) => (
              <option key={i} value={v._id}>
                {v.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Limit</label>
        <input
          type="number"
          onChange={handleChange("limit")}
          className="form-control"
          value={limit}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Vaccine Date</label>
        <input
          type="datetime-local"
          onChange={handleChange("vaccineDate")}
          className="form-control"
          value={vaccineDate}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Notes</label>
        <textarea
          onChange={handleChange("notes")}
          className="form-control"
          value={notes}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Address</label>
        <input
          onChange={handleChange("address")}
          type="text"
          className="form-control"
          value={address}
        />
      </div>

      <button className="btn btn-outline-primary">
        Create Vaccination Schedule
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdVaccination ? "" : "none" }}
    >
      <h2>{`${createdVaccination} is created!`}</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new vaccination"
      description={`G'day ${user.name}, ready to add a new vaccination?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddVaccinationSchedule;
