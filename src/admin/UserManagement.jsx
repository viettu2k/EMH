import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
// import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import moment from "moment";
import { getListUser } from "./apiAdmin";
import DeleteUser from "./DeleteUser";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const loadListUser = () => {
    getListUser().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(
    () => {
      loadListUser();
    },
    // eslint-disable-next-line
    []
  );

  const listUser = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header">List user in the system</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"> # </th>
              <th scope="col"> Name </th>
              <th scope="col"> Role </th>
              <th scope="col"> DOB </th>
              <th scope="col"> Address </th>
              <th scope="col"> Phone Number </th>
              <th scope="col"> Edit </th>
              <th scope="col"> Delete </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((u, i) => {
                return (
                  <tr key={i}>
                    <th scope="row"> {i + 1} </th>
                    <td>
                      <Link
                        to={`/public-profile/${u._id}`}
                        className="btn btn-raised btn-primary btn-sm"
                      >
                        {u.name}
                      </Link>
                    </td>
                    <td>
                      {u.role === 0
                        ? "Registered User"
                        : u.role === 1
                        ? "Medical Staff"
                        : u.role === 2
                        ? "Medical Center"
                        : "Admin"}
                    </td>
                    <td> {moment(u.dob).format("DD/MM/YYYY")} </td>
                    <td> {u.address} </td>
                    <td> {u.phoneNumber} </td>
                    <td>
                      <Link
                        className="btn btn-raised btn-success btn-sm"
                        to={`/edit-user/${u._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <DeleteUser userId={u._id} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Layout title="User Management" description={``} className="container">
      <div className="row">
        <div className="col-12">{listUser()}</div>
      </div>
    </Layout>
  );
}
