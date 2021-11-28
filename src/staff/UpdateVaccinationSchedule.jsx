import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {
  getVaccinationSchedule,
  updateVaccinationSchedule,
  getVaccinesByCenter,
} from "./apiStaff";
import Layout from "../core/Layout";

export default function EditCenter(props) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    type: "",
    notes: "",
    address: "",
    limit: "",
    ownership: "",
    loading: false,
    error: "",
    editedVaccination: "",
  });

  const [centers, setCenters] = useState([]);

  const initCenters = () => {
    getVaccinesByCenter(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCenters(data);
      }
    });
  };

  const init = (vaccinationId) => {
    getVaccinationSchedule(vaccinationId).then((data) => {
      if (data.error) {
        setValues({ error: data.error });
      } else {
        // console.log(data);
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          type: data.type,
          notes: data.notes,
          limit: data.limit,
          ownership: data.ownership,
          address: data.address,
        });
        initCenters();
      }
    });
  };

  useEffect(
    () => {
      const vaccinationId = props.match.params.vaccinationId;
      init(vaccinationId);
    },
    // eslint-disable-next-line
    []
  );

  const { user, token } = isAuthenticated();
  const {
    id,
    name,
    type,
    notes,
    limit,
    ownership,
    address,
    loading,
    error,
    editedVaccination,
  } = values;

  const isValid = () => {
    if (!name || !type || !address || !limit || !ownership) {
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
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    const { name, type, notes, address, limit, ownership } = values;
    if (isValid) {
      updateVaccinationSchedule(id, user._id, token, {
        name,
        type,
        notes,
        limit,
        ownership,
        address,
      }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            editedVaccination: name,
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
        <label className="text-muted">Limit</label>
        <input
          type="number"
          onChange={handleChange("limit")}
          className="form-control"
          value={limit}
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

      <button className="btn btn-outline-primary">
        Edit Vaccination Schedule
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
      style={{ display: editedVaccination ? "" : "none" }}
    >
      <h2>{`${editedVaccination} is edited!`}</h2>
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
      <Link to={`/vaccinations/${id}`} className="text-warning">
        Back to Vaccination Schedule
      </Link>
    </div>
  );

  return (
    <Layout
      title="Edit Vaccination Schedule"
      description={`G'day ${
        isAuthenticated().user.name
      }, ready to edit vaccination schedule?`}
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
