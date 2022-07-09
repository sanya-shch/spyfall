import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase";
import Input from "../../components/Input";

import './style.css';

const Join = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleClickJoin() {
    if (code !== '') {
      const codesDoc = await getDoc(doc(db, "game_room_codes", "code_array"));

      if (codesDoc.data().codes.indexOf(code) !== -1) {
        navigate(`/game/${code}`);
      } else {
        setError("please enter a valid code");
      }
    } else {
      setError("please enter a code");
    }
  }

  const handleChange = value => {
    setError('');
    setCode(value.toUpperCase());
  };

  return (
    <section className="join-page">
      <h2
        className="game-title"
        onClick={() => navigate('/')}
        tabIndex={0}
        role="button"
      >
        SPYFALL
      </h2>
      <div className="wrap">
        <Input
          value={code}
          label="room code"
          maxLength={6}
          onChange={handleChange}
        />
        <button className="cta" onClick={handleClickJoin}>
          <span>Join Game</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
      <p className="error italic"> {error}</p>
    </section>
  );
};

export default Join;
