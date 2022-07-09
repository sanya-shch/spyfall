import React from "react";

import "./style.css";

const CircleTimer = ({ time }) => {
  return (
    <div id="loader-container"  style={{ "--time": `${time}s`, "--time2": `${time * 2}s`, "--time3": `${time * 3}s` }}>
      <div className="loader"/>
      <div className="loader"/>
      <div className="loader"/>
      <div className="loader"/>
      <div className="loader hide"/>
    </div>
  )
};

export default CircleTimer;
