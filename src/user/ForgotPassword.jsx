import React, { useState } from "react";
import { forgotPassword } from "../auth";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
  });

  const { email, message, error } = values;

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword(email).then((data) => {
      if (data.error) {
        // console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        // console.log(data.message);
        setValues({ ...values, message: data.message });
      }
    });
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/" className="text-warning">
        Back to Homepage
      </Link>
    </div>
  );

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Ask for Password Reset</h2>

      {message && <h4 className="alert alert-info">{message}</h4>}
      {error && <h4 className="alert alert-warning">{error}</h4>}

      <form>
        <div className="form-group mt-5">
          <input
            type="email"
            className="form-control"
            placeholder="Your email address"
            value={email}
            name="email"
            onChange={(e) =>
              setValues({
                ...values,
                email: e.target.value,
                message: "",
                error: "",
              })
            }
            autoFocus
          />
        </div>
        <button
          onClick={handleForgotPassword}
          className="btn btn-raised btn-primary"
        >
          Send Password Rest Link
        </button>
      </form>
      {goBack()}
    </div>
  );
}
