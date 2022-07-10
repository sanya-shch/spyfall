import React, { useEffect, useId } from 'react';

import './style.css';

const Button = ({ text, colorOne, colorTwo, onClick }) => {
  const id = useId();

  useEffect(() => {
    const element = document.getElementById(`${id}-btn`);

    const handleClick = e => {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      const ripples = document.createElement('span');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      element.appendChild(ripples);

      setTimeout(() => {
        ripples.remove()
      }, 1000);
    };

    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("click", handleClick);
    }
  }, [id]);

  return (
    <button id={`${id}-btn`} className="ripple-btn" onClick={onClick} style={{ "--crlOne": colorOne, "--crlTwo": colorTwo }}>{text}</button>
  )
};

export default Button;
