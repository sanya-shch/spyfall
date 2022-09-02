import React, { useEffect, useState } from "react";

import Button from "../../../../components/RippleButton";

import "./style.css";

const NameList = ({
  playersList,
  onClickKick,
  isHost,
  hostUid,
  ongoingGame,
  minPlayerCount,
  spyCount,
  putToVote,
  uuid,
  isSpy,
  isMidGamePlayer,
  showJoinForm,
}) => {
  const [players, setPlayers] = useState(playersList);

  useEffect(() => {
    setPlayers(playersList);
  }, [playersList]);

  function changeCheckedArr(item) {
    setPlayers((prev) =>
      prev.map((obj) => {
        if (obj.uid === item.uid) {
          return { ...obj, checked: !item.checked };
        }

        return obj;
      })
    );
  }

  return (
    <div className="names-list">
      <div className="block-title">Players</div>
      {players.map((user, index) => {
        const isItI = user.uid === uuid;

        return (
          <div
            key={index}
            className={`${isItI ? "itsI" : ""} ${
              index === players.length - 1 ? "last-item" : "list-item"
            }`}
          >
            {ongoingGame && !isMidGamePlayer && !showJoinForm ? (
              <div
                onClick={() => !isItI && !isSpy && changeCheckedArr(user)}
                className={`name-item ${!isItI && !isSpy ? "pointer" : ""} ${
                  user.checked ? "line-through" : ""
                }`}
              >
                {user.username}
              </div>
            ) : (
              <div className="name-block">
                <div>
                  {user.username}
                  {isHost && !(user.uid === hostUid) && !ongoingGame && (
                    <Button
                      text="Kick"
                      colorOne="#f06966"
                      colorTwo="#ca3e47"
                      onClick={() => onClickKick(index)}
                    />
                  )}
                </div>
                <div>{user.points}</div>
              </div>
            )}
            {ongoingGame &&
              !isItI &&
              !isSpy &&
              !isMidGamePlayer &&
              !showJoinForm && (
                <Button
                  text="Put To Vote"
                  colorOne="#755bea"
                  colorTwo="#ff72c0"
                  onClick={() => putToVote(user)}
                />
              )}
          </div>
        );
      })}

      {!ongoingGame && isHost && (
        <div className="info-block">
          <div className="info-item">minimum players: {minPlayerCount}</div>
          <div className="info-item">
            {parseInt(spyCount) === 1 ? "spy: " : "spies: "}
            {spyCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default NameList;
