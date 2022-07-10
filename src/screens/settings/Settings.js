import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { ToastContext } from "../../components/Toast";
import { getUserId } from "../../helpers/userId";
import { getSixLetterCode, startGame, updateErrorMessage } from "./helpers";
import Input from "../../components/Input";
import CircleButton from "../../components/CircleButton";

import './style.css';

const Settings = ({ gameId, setGameId }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  // const [spyCount, setSpyCount] = useState('1');
  const spyCount = '1';

  const [minPlayers, setMinPlayers] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');

  const uuid = getUserId();

  // const { setToast } = React.useContext(ToastContext);
  // useEffect(() => {
  //   setToast({
  //     message: "Enter a USERNAME to create a game.",
  //     type: 'info',
  //   });
  // }, [setToast]);

  useEffect(() => {
    setGameId(getSixLetterCode());
  }, [setGameId]);

  useEffect(() => {
    if (parseInt(spyCount) > 1) {
      setMinPlayers(5);
    } else {
      setMinPlayers(3);
    }
  }, [spyCount]);

  useEffect(() => {
    if (errorMessage) {
      updateErrorMessage({
        username,
        spyCount,
        setErrorMessage,
      });
    }
  }, [username, spyCount, errorMessage]);

  const handleClickCreateGame = () => {
    updateErrorMessage({
      username,
      spyCount,
      setErrorMessage,
    });

    if (username && spyCount) {
      startGame({
        uuid,
        gameId,
        setGameId,
        username,
        spyCount,
        minPlayers,
        setErrorMessage,
        navigate,
      });
    }
  };

  const handleChangeUsername = value => {
    setUsername(value);
  };

  return (
    <section className="settings-page">
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
          value={username}
          label="username"
          maxLength={15}
          onChange={handleChangeUsername}
        />
        <CircleButton
          handleClick={handleClickCreateGame}
          text='Create Game'
          svg={(
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          )}
        />
      </div>
      {errorMessage ? (
        <p className="info error italic"> {errorMessage}</p>
      ) : (
        <p className="info italic">
          you need a minimum of {minPlayers} players to play
        </p>
      )}
    </section>
  );
};

export default Settings;
