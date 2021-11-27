import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createVaccine } from "./apiCenter";

const AddVaccine = () => {
  const [values, setValues] = useState({
    name: "",
    type: "",
    quantity: "",
    timeConsuming: "",
    loading: false,
    error: "",
    createdVaccine: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    type,
    quantity,
    timeConsuming,
    loading,
    error,
    createdVaccine,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    const { name, type, quantity, timeConsuming } = values;
    createVaccine(user._id, token, {
      name,
      type,
      quantity,
      timeConsuming,
    }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          type: "",
          quantity: "",
          timeConsuming: "",
          loading: false,
          createdVaccine: data.name,
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
        <label className="text-muted">Type</label>
        <input
          onChange={handleChange("type")}
          type="text"
          className="form-control"
          value={type}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          onChange={handleChange("quantity")}
          className="form-control"
          value={quantity}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Time Consuming (Months)</label>
        <input
          type="datetime-local"
          onChange={handleChange("timeConsuming")}
          className="form-control"
          value={timeConsuming}
        />
      </div>

      <button className="btn btn-outline-primary">Add Vaccine</button>
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
      style={{ display: createdVaccine ? "" : "none" }}
    >
      <h2>{`${createdVaccine} is added!`}</h2>
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
      <Link to="/center/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new vaccine"
      description={`G'day ${user.name}, ready to add a new vaccine?`}
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

export default AddVaccine;
