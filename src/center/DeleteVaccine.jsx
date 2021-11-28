import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { removeVaccine } from "./apiCenter";

export default function DeleteVaccine({ vaccineId }) {
  const [redirect, setRedirect] = useState(false);

  const deleteVaccine = () => {
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    removeVaccine(vaccineId, userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // redirect
        setRedirect(true);
      }
    });
  };

  const redirectToVaccineManagement = () => {
    if (redirect) {
      return window.location.reload();
    }
  };

  const deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete this vaccine?"
    );
    if (answer) {
      deleteVaccine();
    }
  };

  return (
    <>
      {!redirect ? (
        <button
          onClick={deleteConfirmed}
          className="btn btn-raised btn-danger btn-sm"
        >
          Delete
        </button>
      ) : (
        redirectToVaccineManagement()
      )}
    </>
  );
}
