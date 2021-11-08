import React, { useState } from "react";
import { resetPassword } from "../auth";
import { Link } from "react-router-dom";

export default function ResetPassword(props) {
  const [values, setValues] = useState({
    newPassword: "",
    message: "",
    error: "",
  });

  const { newPassword, message, error } = values;

  const handleResetPassword = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });

    resetPassword({
      newPassword: newPassword,
      resetPasswordLink: props.match.params.resetPasswordToken,
    }).then((data) => {
      if (data.error) {
        // console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        // console.log(data.message);
        setValues({ ...values, message: data.message, newPassword: "" });
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
      <h2 className="mt-5 mb-5">Reset your Password</h2>

      {message && <h4 className="alert alert-info">{message}</h4>}
      {error && <h4 className="alert alert-warning">{error}</h4>}

      <form>
        <div className="form-group mt-5">
          <input
            type="password"
            className="form-control"
            placeholder="Your new password"
            value={newPassword}
            name="newPassword"
            onChange={(e) =>
              setValues({
                ...values,
                newPassword: e.target.value,
                message: "",
                error: "",
              })
            }
            autoFocus
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="btn btn-raised btn-primary"
        >
          Reset Password
        </button>
      </form>
      {goBack()}
    </div>
  );
}
