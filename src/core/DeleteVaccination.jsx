import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { removeVaccination } from "./apiCore";

export default function DeleteVaccination({ vaccinationId }) {
  const [redirect, setRedirect] = useState(false);

  const deleteVaccination = () => {
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    removeVaccination(vaccinationId, userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // redirect
        setRedirect(true);
      }
    });
  };

  const redirectToHome = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your vaccination schedule?"
    );
    if (answer) {
      deleteVaccination();
      redirectToHome();
    }
  };

  return (
    <>
      {!redirect ? (
        <button onClick={deleteConfirmed} className="btn btn-raised btn-danger">
          Delete Vaccination Schedule
        </button>
      ) : (
        redirectToHome()
      )}
    </>
  );
}
