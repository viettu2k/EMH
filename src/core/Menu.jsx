import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#d0ff00" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/centers")}
            to="/centers"
          >
            Centers
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/staff/dashboard")}
              to="/staff/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 2 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/center/dashboard")}
              to="/center/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 2 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(
                history,
                `/vaccines/${isAuthenticated().user._id}`
              )}
              to={`/vaccines/${isAuthenticated().user._id}`}
            >
              Vaccines
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 2 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, `/statistics`)}
              to={`/statistics`}
            >
              Statistics
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 3 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 3 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/users")}
              to="/users"
            >
              User Management
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
