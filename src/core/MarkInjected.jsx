import React, { useState } from "react";

export default function MarkInjected(props) {
  const {
    status,
    userId,
    vaccination,
    getIndex,
    updateVaccinationSchedule,
    token,
    staffId,
  } = props;
  const [oldStatus, setOldStatus] = useState(status);
  const markUser = (userId, vaccination) => {
    const index = getIndex(vaccination.participants, userId);
    vaccination.participants[index].status = !oldStatus;
    setOldStatus(!oldStatus);
    const { participants } = vaccination;
    updateVaccinationSchedule(vaccination._id, staffId, token, {
      participants,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
    });
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
