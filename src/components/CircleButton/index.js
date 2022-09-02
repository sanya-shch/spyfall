import React from "react";

import "./style.css";

const CircleButton = ({ handleClick, text, svg }) => {
  return (
    <button className="cta" onClick={handleClick}>
      <span>{text}</span>
      {svg || (
        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5" />
          <polyline points="8 1 12 5 8 9" />
        </svg>
      )}
    </button>
  );
};

export default CircleButton;
