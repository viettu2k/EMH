import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { API } from "../config";
import Layout from "../core/Layout";
import moment from "moment";
import DefaultAvatar from "../images/avatar.jpg";

export default function UpdateProfile({ match }) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "",
    phoneNumber: "",
    address: "",
    photo: "",
    dob: "",
    loading: false,
    error: "",
    reload: "",

    fileSize: 0,
    formData: new FormData(),
  });

  const init = () => {
    const token = isAuthenticated().token;
    read(match.params.userId, token).then((data) => {
      if (data.error) {
        setValues({ error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          email: data.email,
          description: data.description,
          phoneNumber: data.phoneNumber,
          address: data.address,
          dob: moment(data.dob).format("YYYY-MM-DD"),
        });
      }
    });
  };

  const { user, token } = isAuthenticated();
  const {
    id,
    name,
    email,
    password,
    confirmPassword,
    description,
    phoneNumber,
    address,
    dob,
    loading,
    error,
    reload,
    formData,
    fileSize,
  } = values;

  useEffect(
    () => {
      init();
    },
    // eslint-disable-next-line
    []
  );

  const isValid = () => {
    if (fileSize > 100000) {
      setValues({
        ...values,
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }

    if (!name || !description || !address || !phoneNumber) {
      setValues({
        ...values,
        error: "All fields are required",
        loading: false,
      });
      return false;
    }

    return true;
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    formData.set(name, value);
    setValues({ ...values, [name]: value, fileSize });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    if (confirmPassword !== password) {
      setValues({
        ...values,
        error: "Your password doesn't match",
        loading: false,
      });
      return false;
    }
    if (isValid()) {
      update(id, token, formData).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              loading: false,
              reload: true,
            });
          });
        }
      });
    }
  };

  const newPostForm = () => {
    return (
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
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
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

        <div className="form-group">
          <label className="text-muted">Date of Birth</label>
          <input
            type="date"
            onChange={handleChange("dob")}
            className="form-control"
            value={dob}
          />
        </div>

        <button className="btn btn-outline-primary">Update Profile</button>
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const goBack = () => {
    const role = user.role;
    let temp =
      role === 0
        ? "user"
        : role === 1
        ? "staff"
        : role === 2
        ? "center"
        : "admin";
    return (
      <div className="mt-5">
        <Link to={`/${temp}/dashboard`} className="text-warning">
          Back to Dashboard
        </Link>
      </div>
    );
  };

  const reloadPage = () => {
    if (reload) {
      return window.location.reload();
    }
  };

  const userAvatar = () => {
    const photoUrl = user._id ? `${API}/user/photo/${user._id}` : DefaultAvatar;
    return (
      <>
        <h4>Present photo</h4>
        <img
          style={{ height: "250px", width: "auto" }}
          className="img-thumbnail rounded border border-primary"
          src={photoUrl}
          onError={(i) => (i.target.src = `${DefaultAvatar}`)}
          alt={name}
        />
      </>
    );
  };

  return (
    <Layout
      title="Update Profile"
      description={`G'day ${
        isAuthenticated().user.name
      }, ready to update profile?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {reloadPage()}
          {userAvatar()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
}
