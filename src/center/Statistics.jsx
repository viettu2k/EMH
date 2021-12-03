import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
// import moment from "moment";
import { getParticipantsByCenter } from "./apiCenter";

export default function Statistics() {
  const [participantsByCenter, setParticipantsByCenter] = useState([]);
  const {
    user: { _id, name },
    token,
  } = isAuthenticated();

  const loadListByCenter = (centerId) => {
    getParticipantsByCenter(centerId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setParticipantsByCenter(data);
      }
    });
  };

  useEffect(
    () => {
      loadListByCenter(_id);
    },
    // eslint-disable-next-line
    []
  );

  const filters = () => {
    return (
      <div className="card">
        <h4 className="card-header">Filters</h4>
      </div>
    );
  };

  const listByCenter = () => {
    let temp = [];
    for (let i = 0; i < participantsByCenter.length; i++) {
      // console.log(participantsByCenter[i]);
      for (let j = 0; j < participantsByCenter[i].participants.length; j++) {
        temp.push(participantsByCenter[i].participants[j]);
      }
    }
    return (
      <div className="card mb-5">
        <h4 className="card-header">List user vaccinated in {name}</h4>
        <ol className="list-group list-group-numbered">
          {temp &&
            temp.map((p, i) => {
              return (
                <li key={i} className="list-group-item">
                  <div className="row">
                    <div className="col">
                      {i + 1}.
                      <Link to={`/public-profile/${p.id}`}>{p.name}</Link>
                    </div>
                    {!p.status ? (
                      <i
                        style={{ color: "red" }}
                        className="fas fa-lg fa-window-close"
                      />
                    ) : (
                      <i
                        style={{ color: "green" }}
                        className="fas fa-lg fa-check-square"
                      />
                    )}
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    );
  };

  return (
    <Layout title="User Statistics" description={``} className="container">
      <div className="row">
        <div className="col-3">{filters()}</div>
        <div className="col-9">{listByCenter()}</div>
      </div>
    </Layout>
  );
}
