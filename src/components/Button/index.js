import React from "react";

import './style.css';

const Button = ({ text, color, onClick }) => {
  return (
    <button className="ns-btn" onClick={onClick} style={{"--crl": color}}><span>{text}</span><i></i></button>
  );
};

export default Button;
