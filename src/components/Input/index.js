import React from 'react';

import './style.css';

const Input = ({ value, label, onChange, ...restProps }) => {
  const handleChange = event => {
    const { value: eventValue } = event.target;
    onChange(eventValue);
  };

  return (
    <div className="inputBox">
      <input
        type="text"
        required="required"
        value={value}
        onChange={handleChange}
        { ...restProps }
      />
      <span>{label}</span>
    </div>
  )
};

export default Input;

// <Input
//   value={name}
//   label={"Name"}
//   onChange={setName}
// />
