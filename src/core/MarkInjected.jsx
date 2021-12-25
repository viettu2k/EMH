import React, { useState, useEffect } from "react";
import { read, updateHistory } from "./apiCore";

export default function MarkInjected(props) {
  const {
    status,
    userId,
    vaccination,
    getIndex,
    updateVaccinationSchedule,
    token,
    staffId,
    getIndexHistory,
  } = props;
  const [user, setUser] = useState({});
  const [oldStatus, setOldStatus] = useState(status);

  const loadProfile = (userId) => {
    read(userId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(data);
        setUser(data);
      }
    });
  };

  useEffect(
    () => {
      loadProfile(userId);
    },
    // eslint-disable-next-line
    []
  );

  const markUser = (userId, vaccination) => {
    const index = getIndex(vaccination.participants, userId);
    vaccination.participants[index].status = !oldStatus;
    const { participants } = vaccination;
    updateVaccinationSchedule(vaccination._id, staffId, token, {
      participants,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
    });
    const userIndex = getIndexHistory(user.histories, vaccination._id);
    user.histories[userIndex].status = !oldStatus;
    const { histories } = user;
    updateHistory(userId, token, {
      histories,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
    });
    setOldStatus(!oldStatus);
  };
  return (
    <div onClick={() => markUser(userId, vaccination)} className="text-center">
      {!oldStatus ? (
        <i
          style={{ color: "red", cursor: "pointer" }}
          className="fas fa-lg fa-window-close"
        />
      ) : (
        <i
          style={{ color: "green", cursor: "pointer" }}
          className="fas fa-lg fa-check-square"
        />
      )}
    </div>
  );
}
