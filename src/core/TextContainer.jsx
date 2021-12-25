import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import onlineIcon from "../images/onlineIcon.png";

const TextContainer = ({ users }) => (
  <div className="card mb-5">
    <h3 className="card-header">People currently chatting:</h3>
    <ul className="list-group">
      {users &&
        users.map((u, i) => (
          <li key={i} className="list-group-item">
            {isAuthenticated().user.role >= 1 ? (
              <Link
                to={`/public-profile/${u.userId}`}
                className="btn btn-raised btn-primary btn-sm"
              >
                {u.name} <img alt="Online Icon" src={onlineIcon} />
              </Link>
            ) : (
              <p>
                {u.name} <img alt="Online Icon" src={onlineIcon} />
              </p>
            )}
          </li>
        ))}
    </ul>
  </div>
);

export default TextContainer;
