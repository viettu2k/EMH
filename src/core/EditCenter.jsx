import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getCenter, updateCenter } from "./apiCore";
import { API } from "../config";
import Layout from "./Layout";

export default function EditCenter(props) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    photo: "",
    loading: false,
    error: "",
    createdCenter: "",
    fileSize: 0,
    redirectToProfile: false,
    formData: new FormData(),
  });

  const init = (centerId) => {
    getCenter(centerId).then((data) => {
      if (data.error) {
        setValues({ error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          description: data.description,
          phoneNumber: data.phoneNumber,
          address: data.address,
        });
      }
    });
  };

  const { user, token } = isAuthenticated();
  const {
    id,
    name,
    description,
    phoneNumber,
    address,
    // photo,
    loading,
    error,
    editedCenter,
    // redirectToProfile,
    formData,
    fileSize,
  } = values;

  useEffect(
    () => {
      const centerId = props.match.params.centerId;
      init(centerId);
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

    if (name.length === 0 || !description || !address || !phoneNumber) {
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
    if (isValid) {
      updateCenter(id, user._id, token, formData).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            editedCenter: data.name,
          });
        }
      });
    }
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post A New Photo</h4>
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

      <button className="btn btn-outline-primary">Edit Center</button>
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
      style={{ display: editedCenter ? "" : "none" }}
    >
      <h2>{`${editedCenter} is edited!`}</h2>
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
      <Link to={`/centers/${id}`} className="text-warning">
        Back to Medical Center
      </Link>
    </div>
  );

  return (
    <Layout
      title="Edit Medical Center"
      description={`G'day ${
        isAuthenticated().user.name
      }, ready to edit center?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          <h4>Present photo</h4>
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={`${API}/centers/photo/${props.match.params.centerId}`}
            alt={name}
          />
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
}
