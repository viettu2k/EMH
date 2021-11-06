import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createVaccination, getCenters } from "./apiStaff";

const AddVaccination = () => {
  const [values, setValues] = useState({
    name: "",
    type: "",
    notes: "",
    address: "",
    centers: [],
    ownership: "",
    loading: false,
    error: "",
    createdVaccination: "",
    redirectToProfile: false,
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    type,
    notes,
    address,
    centers,
    // ownership,
    loading,
    error,
    createdVaccination,
    // redirectToProfile,
  } = values;

  // load categories and set form data
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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    const { name, type, notes, address } = values;
    createVaccination(user._id, token, { name, type, notes, address }).then(
      (data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            type: "",
            notes: "",
            address: "",
            ownership: "",
            centers: "",
            loading: false,
            createdVaccination: data.name,
          });
        }
      }
    );
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
        <label className="text-muted">Type</label>
        <input
          onChange={handleChange("type")}
          type="text"
          className="form-control"
          value={type}
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

      <div className="form-group">
        <label className="text-muted">Ownership</label>
        <select onChange={handleChange("ownership")} className="form-control">
          <option>Please select</option>
          {centers &&
            centers.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-outline-primary">Create Vaccination</button>
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

export default AddVaccination;
