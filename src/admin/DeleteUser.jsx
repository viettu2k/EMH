import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { removeUser } from "./apiAdmin";

export default function DeleteUser({ userId }) {
  const [redirect, setRedirect] = useState(false);

  const deleteUser = () => {
    const token = isAuthenticated().token;
    removeUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // redirect
        setRedirect(true);
      }
    });
  };

  const reloadPage = () => {
    if (redirect) {
      return window.location.reload();
    }
  };

  const deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this user?");
    if (answer) {
      deleteUser();
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
        reloadPage()
      )}
    </>
  );
}
