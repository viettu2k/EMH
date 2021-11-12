import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { removeCenter } from "./apiCore";

export default function DeleteCenter({ centerId }) {
  const [redirect, setRedirect] = useState(false);

  const deleteCenter = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    removeCenter(centerId, userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // redirect
        setRedirect(true);
      }
    });
  };

  const deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your medical center?"
    );
    if (answer) {
      deleteCenter();
    }
  };

  const redirectToHome = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      {redirectToHome}
      <button onClick={deleteConfirmed} className="btn btn-raised btn-danger">
        Delete Medical Center
      </button>
    </>
  );
}
