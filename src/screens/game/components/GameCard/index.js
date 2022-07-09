import React, { useMemo } from 'react';

import { IMAGES } from "../../../../assets/images";

import './style.css';

const GameCard = ({ isSpy, locationData }) => {
  const imgSrc = useMemo(() => isSpy ? IMAGES.spy : IMAGES[locationData.id], [isSpy, locationData]);

  return(
    <div className="game-card">
      <i/>
      <img alt="" src={imgSrc} />
      <div className="text">{isSpy ? 'YOU ARE THE SPY!' : <span>{locationData.title}</span>}</div>
    </div>
  );
};

export default GameCard;
