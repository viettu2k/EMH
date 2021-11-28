import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getVaccine, updateVaccine } from "./apiCenter";
import Layout from "../core/Layout";

export default function UpdateVaccine(props) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    type: "",
    quantity: "",
    timeConsuming: "",
    loading: false,
    error: "",
    editedVaccine: "",
  });

  const init = (vaccineId) => {
    getVaccine(vaccineId).then((data) => {
      if (data.error) {
        setValues({ error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          type: data.type,
          quantity: data.quantity,
          timeConsuming: data.timeConsuming,
        });
      }
    });
  };

  useEffect(
    () => {
      const vaccineId = props.match.params.vaccineId;
      init(vaccineId);
    },
    // eslint-disable-next-line
    []
  );

  const { user, token } = isAuthenticated();
  const {
    id,
    name,
    type,
    quantity,
    timeConsuming,
    error,
    loading,
    editedVaccine,
  } = values;

  const isValid = () => {
    if (!name || !type || !quantity || !timeConsuming) {
      setValues({
        ...values,
        error: "All fields are required",
        loading: false,
      });
      return false;
    }

    if (quantity < 0) {
      setValues({
        ...values,
        error: "Quantity cannot be negative",
        loading: false,
      });
      return false;
    }

    if (timeConsuming < 0) {
      setValues({
        ...values,
        error: "Time Consuming cannot be negative",
        loading: false,
      });
      return false;
    }

    return true;
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setValues({ ...values, error: "" });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    const { name, type, quantity, timeConsuming } = values;
    if (isValid()) {
      updateVaccine(id, user._id, token, {
        name,
        type,
        quantity,
        timeConsuming,
      }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            editedVaccine: name,
          });
        }
      });
    }
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
          type="number"
          onChange={handleChange("timeConsuming")}
          className="form-control"
          value={timeConsuming}
        />
      </div>

      <button className="btn btn-outline-primary">Update Vaccine</button>
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
      style={{ display: editedVaccine ? "" : "none" }}
    >
      <h2>{`${editedVaccine} is edited!`}</h2>
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
      <Link
        to={`/vaccines/${isAuthenticated().user._id}`}
        className="text-warning"
      >
        Back to Vaccine Management
      </Link>
    </div>
  );

  return (
    <Layout
      title="Update Vaccine"
      description={`G'day ${
        isAuthenticated().user.name
      }, ready to update vaccine?`}
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
}
