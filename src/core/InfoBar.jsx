import React from "react";

// import closeIcon from "../images/closeIcon.png";
// import onlineIcon from "../images/onlineIcon.png";

// import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="card bg-primary">
    {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
    <h4 className="card-header text-light">Room chat by {room}</h4>
  </div>
);

export default InfoBar;
