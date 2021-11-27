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
    dob: "",
    address: "",
    error: "",
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, phoneNumber, dob, address, error, success } =
    values;

  const init = (userId) => {
    // console.log(userId);
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

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
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
