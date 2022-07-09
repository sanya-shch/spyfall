import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";

import './style.css';

const Error = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className="errors-page">
      <div className="stripe_inner">Yikes! Looks like you have stumbled upon the wall of non-existance! ...or
        perhaps just a finished game.</div>
      <Button
        text="Go To Home"
        color="#ca3e47"
        onClick={handleClick}
      />
    </section>
  );
};

export default Error;
