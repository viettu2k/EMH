import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import moment from "moment";

const UpdateProfile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    description: "",
    address: "",
    photo: "",
    dob: "",
    error: "",
    fileSize: 0,
    redirectToProfile: false,
    formData: new FormData(),
    success: false,
  });

  const { token } = isAuthenticated();
  const {
    name,
    email,
    password,
    phoneNumber,
    dob,
    fileSize,
    address,
    error,
    success,
    formData,
  } = values;

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          dob: moment(data.dob).format("YYYY-MM-DD"),
          address: data.address,
        });
      }
    });
  };

  useEffect(
    () => {
      init(match.params.userId);
    },
    // eslint-disable-next-line
    []
  );

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const isValid = () => {
    if (fileSize > 100000) {
      setValues({
        ...values,
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }
    if (name.length === 0) {
      setValues({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setValues({
        ...values,
        error: "A valid Email is required",
        loading: false,
      });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      setValues({
        ...values,
        error: "Password must be at least 6 characters",
        loading: false,
      });
      return false;
    }
    return true;
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, {
      name,
      email,
      password,
      phoneNumber,
      dob,
      address,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            dob: data.dob,
            address: data.address,
            success: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const profileUpdate = (name, email, password, phoneNumber, dob, address) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("password")}
          className="form-control"
          value={password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Address</label>
        <input
          type="text"
          onChange={handleChange("address")}
          className="form-control"
          value={address}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Phone Number</label>
        <input
          type="text"
          onChange={handleChange("phoneNumber")}
          className="form-control"
          value={phoneNumber}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Date of Birth</label>
        <input
          type="date"
          onChange={handleChange("dob")}
          className="form-control"
          value={dob}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container col-md-8 offset-md-2"
    >
      <h2 className="mb-4">Profile update</h2>
      {profileUpdate(name, email, password, phoneNumber, dob, address)}
      {redirectUser(success)}
      {showError()}
    </Layout>
  );
};

export default UpdateProfile;
