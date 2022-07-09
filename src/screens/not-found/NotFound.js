import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";

import "./style.css";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const element = document.documentElement;

    const handleMouseMove = e => {
      element.style.setProperty('--x', e.clientX + 'px');
    };

    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    }
  }, [document]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className="not-found">
      <div className="text">
        <h2 style={{"--i":"0.5"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"1.5"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"2.5"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"2.25"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"1.25"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"0.75"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"3"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"0.5"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"0.25"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"1.25"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
        <h2 style={{"--i":"1.75"}}><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span><span>404 Not Found</span></h2>
      </div>

      <Button
        text="Go To Home"
        color="#ca3e47"
        onClick={handleClick}
      />

      {/*<button className="nfs-btn" onClick={handleClick} style={{"--crl":"#0f0"}}><span>Go Home</span></button>*/}
    </section>
  );
};

export default NotFound;
