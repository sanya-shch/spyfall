import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

// import { ToastContext } from "../../components/Toast";
import { db } from "../../firebase";
import Input from "../../components/Input";
import CircleButton from "../../components/CircleButton";

import './style.css';

const Join = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const { setToast } = React.useContext(ToastContext);
  // React.useEffect(() => {
  //   setToast({
  //     message: "Enter a ROOM CODE to join a game.",
  //     type: 'info',
  //   })
  // }, [setToast]);

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
        <CircleButton
          handleClick={handleClickJoin}
          text='Join Game'
          svg={(
            <svg width="16px" height="16px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5" />
              <polyline points="8 1 12 5 8 9" />
            </svg>
          )}
        />
      </div>
      <p className="error italic"> {error}</p>
    </section>
  );
};

export default Join;
