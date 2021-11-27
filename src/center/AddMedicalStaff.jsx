import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createStaff, addMember } from "./apiCenter";

const AddMedicalStaff = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    photo: "",
    loading: false,
    error: "",
    createdCenter: "",
    redirectToProfile: false,
    formData: new FormData(),
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    email,
    password,
    confirmPassword,
    phoneNumber,
    address,
    // photo,
    loading,
    error,
    createdCenter,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      setValues({ ...values, error: "Your password doesn't match" });
      return false;
    }
    setValues({ ...values, error: "", loading: true });
    createStaff(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        const { _id } = data;
        addMember(user._id, token, { _id }).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          }
        });
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          address: "",
          photo: "",
          loading: false,
          createdCenter: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

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
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Confirm Password</label>
        <input
          onChange={handleChange("confirmPassword")}
          type="password"
          className="form-control"
          value={confirmPassword}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Phone Number</label>
        <input
          onChange={handleChange("phoneNumber")}
          type="text"
          className="form-control"
          value={phoneNumber}
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

      <button className="btn btn-outline-primary">Add Medical Staff</button>
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
      style={{ display: createdCenter ? "" : "none" }}
    >
      <h2>{`${createdCenter} is created!`}</h2>
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
      title="Add a new medical center center"
      description={`G'day ${user.name}, ready to add a new center?`}
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

export default AddMedicalStaff;
