import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getVaccination,
  registerVaccination,
  cancelRegister,
  getCenter,
  sendVaccinationTime,
} from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DeleteVaccinationSchedule from "../staff/DeleteVaccinationSchedule";
import moment from "moment";

export default function SingleVaccinationSchedule(props) {
  const [values, setValues] = useState({
    vaccination: {},
    load: false,
    center: {},
    sentEmail: false,
    register: false,
    error: "",
    success: false,
  });

  const { vaccination, register, error, center, load, success, sentEmail } =
    values;

  const getIndex = (array = [], name) => {
    let temp = -1;
    array.forEach((element, i) => {
      if (element["name"] === name) {
        temp = i;
      }
    });
    return temp;
  };

  const checkRegister = (participants = []) => {
    const name = isAuthenticated() && isAuthenticated().user.name;
    let match = getIndex(participants, name) !== -1;
    return match;
  };

  const loadSingleCenter = (centerId) => {
    getCenter(centerId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          center: data,
        });
      }
    });
  };

  const loadSingleVaccination = (vaccinationId) => {
    getVaccination(vaccinationId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          vaccination: data,
          register: checkRegister(data.participants),
          load: true,
        });
      }
    });
  };

  useEffect(
    () => {
      const vaccinationId = props.match.params.vaccinationId;
      loadSingleVaccination(vaccinationId);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      loadSingleCenter(vaccination.ownership);
    },
    // eslint-disable-next-line
    [load]
  );

  const handleVaccineTime = (participants = [], vaccineTime) => {
    const name = isAuthenticated() && isAuthenticated().user.name;
    let temp = -1;
    participants.forEach((element, i) => {
      if (element["name"] === name) {
        temp = i;
      }
    });
    return moment(vaccineTime).add(temp * 3, "m");
  };

  const registerToggle = () => {
    let callApi = !register ? registerVaccination : cancelRegister;
    const {
      user: { _id, name },
      token,
    } = isAuthenticated();
    const id = _id;
    if (!register) {
      setValues({ ...values, sentEmail: false });
    } else {
      setValues({ ...values, sentEmail: true });
    }
    const vaccinationId = props.match.params.vaccinationId;

    callApi(token, { vaccinationId, name, id }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          register: !register,
          vaccination: data,
          success: !success,
        });
      }
    });
  };

  const sendEmail = () => {
    const {
      user: { name, email },
    } = isAuthenticated();
    const { name: vaccinationName, vaccineDate, participants } = vaccination;
    if (getIndex(participants, name) !== -1 && !sentEmail) {
      const vaccinationTime = handleVaccineTime(
        participants,
        vaccineDate
      ).format("LLLL");
      sendVaccinationTime(email, vaccinationName, vaccinationTime).then(
        (data) => {
          if (data.error) {
            // console.log(data.error);
            setValues({ ...values, error: data.error });
          } else {
            // console.log(data.message);
            // setValues({ ...values, sentEmail: true });
          }
        }
      );
    }
  };

  const informationForm = () => (
    <div className="row">
      {vaccination && (
        <>
          <div className="col-md-2">
            {isAuthenticated() && isAuthenticated().user.role >= 1 && (
              <>
                <div className="col">
                  <div className="row mb-2">
                    <Link
                      className="btn btn-raised btn-success"
                      to={`/update/vaccination/${props.match.params.vaccinationId}`}
                    >
                      Update Vaccination Schedule
                    </Link>
                  </div>
                  <div className="row">
                    <DeleteVaccinationSchedule
                      vaccinationId={vaccination._id}
                    />
                  </div>
                </div>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <>
                {!register ? (
                  <h5
                    onClick={registerToggle}
                    className="btn btn-raised btn-success"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="fa fa-check-circle text-success bg-dark"
                      style={{ padding: "10px", borderRadius: "50%" }}
                    />
                    <br />
                    Register Vaccination
                  </h5>
                ) : (
                  <h5
                    onClick={registerToggle}
                    className="btn btn-raised btn-danger"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="fa fa-times-circle text-warning bg-dark"
                      style={{ padding: "10px", borderRadius: "50%" }}
                    />
                    <br />
                    Cancel Register Vaccination
                  </h5>
                )}
              </>
            )}
          </div>
          <div className="col-5">
            <div className="card mb-5">
              <h3 className="card-header">Information</h3>
              <ul className="list-group">
                <li className="list-group-item">{vaccination.name}</li>
                <li className="list-group-item">
                  Vaccine: {vaccination.vaccine && vaccination.vaccine.name}
                </li>
                <li className="list-group-item">
                  Address: {vaccination.address}
                </li>
                <li className="list-group-item">Limit: {vaccination.limit}</li>
                <li className="list-group-item">
                  Vaccination time:{" "}
                  {moment(vaccination.vaccineDate).format("LLLL")}
                </li>
                {vaccination.ownership && (
                  <li className="list-group-item">
                    Organized By:{" "}
                    <Link
                      to={`/centers/${vaccination.ownership}`}
                      className="btn btn-raised btn-primary btn-sm"
                    >
                      {center.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card mb-5">
              <h3 className="card-header">Participants</h3>
              <ol className="list-group list-group-numbered">
                {vaccination.participants &&
                  vaccination.participants.map((p, i) => {
                    return (
                      <li key={i} className="list-group-item">
                        <div className="row">
                          <div className="col">
                            {i + 1}.<Link to={`/public/${p.id}`}>{p.name}</Link>
                          </div>
                          <div className="col">
                            {`${moment(vaccination.vaccineDate)
                              .add(i * 3, "m")
                              .calendar()}`}
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/" className="text-warning">
        Back to Homepage
      </Link>
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      <h2>{`You have successfully registered for vaccination! Your vaccine time is: ${handleVaccineTime(
        vaccination.participants,
        vaccination.vaccineDate
      ).calendar()}. You can check your vaccine time in your email!`}</h2>
    </div>
  );

  return (
    <Layout
      title={vaccination && vaccination.name}
      description={
        vaccination &&
        vaccination.participants &&
        vaccination.participants.length === vaccination.limit
          ? "Status: Full"
          : "Status: Available"
      }
      className="container"
    >
      {informationForm()}
      {sendEmail()}
      {showSuccess()}
      {showError()}
      {goBack()}
    </Layout>
  );
}
