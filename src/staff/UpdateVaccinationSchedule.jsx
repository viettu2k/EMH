import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {
  getVaccinationSchedule,
  updateVaccinationSchedule,
  getVaccinesByCenter,
  updateVaccine,
} from "./apiStaff";
import Layout from "../core/Layout";
import moment from "moment";

export default function UpdateVaccinationSchedule(props) {
  const [values, setValues] = useState({
    id: "",
    name: "",
    vaccine: {},
    tempVaccine: {},
    notes: "",
    address: "",
    limit: "",
    oldLimit: "",
    vaccines: [],
    vaccineDate: "",
    loading: false,
    error: "",
    updatedVaccination: "",
  });

  const { user, token } = isAuthenticated();
  const {
    id,
    name,
    vaccine,
    notes,
    address,
    limit,
    vaccineDate,
    vaccines,
    loading,
    error,
    updatedVaccination,
  } = values;

  const initVaccines = () => {
    getVaccinesByCenter(user.references, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, vaccines: data });
      }
    });
  };

  const init = (vaccinationId) => {
    getVaccinationSchedule(vaccinationId).then((data) => {
      if (data.error) {
        setValues({ error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          tempVaccine: data.vaccine,
          notes: data.notes,
          limit: data.limit,
          oldLimit: data.limit,
          vaccineDate: moment(data.vaccineDate).format("YYYY-MM-DDTkk:mm"),
          address: data.address,
        });
      }
    });
  };

  useEffect(
    () => {
      initVaccines();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      if (vaccines) {
        const vaccinationId = props.match.params.vaccinationId;
        init(vaccinationId);
      }
    },
    // eslint-disable-next-line
    [vaccines]
  );

  const isValid = () => {
    if (!name || !vaccine || !address || !limit || !vaccineDate) {
      setValues({
        ...values,
        error: "All fields are required",
        loading: false,
      });
      return false;
    }

    if (limit < 0) {
      setValues({
        ...values,
        error: "Limit cannot be negative",
        loading: false,
      });
      return false;
    }

    return true;
  };

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
    const { name, tempVaccine, notes, address, limit, oldLimit } = values;
    let index = getIndex(vaccines, tempVaccine);
    const vaccine = {
      name: vaccines[index].name,
      id: tempVaccine,
      timeConsuming: vaccines[index].timeConsuming,
    };
    setValues({
      ...values,
      vaccine: vaccine,
    });
    if (isValid()) {
      updateVaccine(tempVaccine, user.references, token, {
        consumed: vaccines[index].consumed + parseInt(limit) - oldLimit,
        quantity: vaccines[index].quantity - parseInt(limit) + oldLimit,
      }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        }
      });
      updateVaccinationSchedule(id, user._id, token, {
        name,
        vaccine,
        notes,
        limit,
        address,
        vaccineDate,
      }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            updatedVaccination: name,
          });
        }
      });
    }
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Vaccine </label>
        <select onChange={handleChange("tempVaccine")} className="form-control">
          <option> Please select </option>
          {vaccines &&
            vaccines.map((v, i) => (
              <option key={i} value={v._id}>
                {v.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted"> Limit </label>
        <input
          type="number"
          onChange={handleChange("limit")}
          className="form-control"
          value={limit}
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Vaccine Date </label>
        <input
          type="datetime-local"
          onChange={handleChange("vaccineDate")}
          className="form-control"
          value={vaccineDate}
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Notes </label>
        <textarea
          onChange={handleChange("notes")}
          className="form-control"
          value={notes}
        />
      </div>

      <div className="form-group">
        <label className="text-muted"> Address </label>
        <input
          onChange={handleChange("address")}
          type="text"
          className="form-control"
          value={address}
        />
      </div>
      <button className="btn btn-outline-primary">
        Update Vaccination Schedule
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
      style={{ display: updatedVaccination ? "" : "none" }}
    >
      <h2> {`${updatedVaccination} is updated!`} </h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2> Loading... </h2>
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
          {showLoading()} {showSuccess()} {showError()} {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
}
