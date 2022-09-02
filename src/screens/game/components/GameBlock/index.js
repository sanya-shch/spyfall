import React, { useState } from "react";

import { IMAGES } from "../../../../assets/images";

import "./style.css";

const GameCard = ({
  isSpy,
  isMidGamePlayer,
  showJoinForm,
  ongoingGame,
  locationsList,
}) => {
  const LocationListItem = ({ item }) => {
    const [checked, setChecked] = useState(false);

    function changeCheckedArr() {
      if (isSpy) {
        setChecked((prev) => !prev);
      }
    }

    return (
      <div
        onClick={changeCheckedArr}
        className={`location-item ${isSpy ? "pointer" : ""}`}
      >
        <img
          className={checked ? "checked" : ""}
          alt={item.title}
          src={IMAGES[item.id]}
          loading="lazy"
          width="200"
          height="200"
        />
        <div>{item.title}</div>
        {checked}
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        )}
      </div>
    );
  };

  return !isMidGamePlayer && !showJoinForm ? (
    <div className="game-block">
      {locationsList.map((item) => (
        <LocationListItem key={item.id} item={item} />
      ))}
    </div>
  ) : (
    ongoingGame && (
      <div className="game-block-info">
        Please wait for the next game to begin ⏱️
      </div>
    )
  );
};

export default GameCard;
