import React, { useEffect, useState, useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { ToastContext } from "../../../../components/Toast";
import { db } from "../../../../firebase";
import ReactPortal from "../../../../components/ConfirmModal/ReactPortal";
import Button from "../../../../components/RippleButton";
import { IMAGES } from "../../../../assets/images";
import locations from "../../../../constants/locations";

import './style.css';

function SpyLocationModal({
                            id,
                            uuid,
                            isOpen,
                            handleClose,
                            playerData,
                            location,
                         }) {
  const [choosenLocation, setChoosenLocation] = useState(null);

  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    setToast({
      message: 'You have one attempt.',
      type: 'info',
    });
  }, [setToast]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.getElementById('root').style.filter = 'blur(2px)';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.getElementById('root').style.filter = '';
    };
  }, [isOpen]);

  if (!isOpen) return;

  const handleClickMakeGuess = () => {
    if (choosenLocation) {
      const player_data_arr = choosenLocation.id !== location.id
        ? playerData.map(player => {
          if (player.uid !== uuid) {
            return { ...player, points: player.points + 1 };
          }

          return player;
        })
        : playerData.map(player => {
          if (player.uid === uuid) {
            return { ...player, points: player.points + 4 }
          }

          return player;
        });

      updateDoc(doc(db, "game_rooms", id), {
        vote_exhibited_uid: '',
        vote_exhibitor_uid: '',
        vote_score: {},

        player_data_arr,
        lastGameSpy: {
          spyUid: uuid,
          toasts: [
            {
              message: choosenLocation.id !== location.id
                ? 'The spy did not guess the location.'
                : 'The spy guessed the location.',
              type: choosenLocation.id !== location.id
                ? 'success'
                : 'danger',
            },
            {
              message: `${playerData.find(item => item.uid === uuid)?.username || '???'} was a spy.`,
              type: 'info',
            },
          ],
        },

        spy_uid: [],
        location: { title: '',  id: '' },
        ongoing_game: false,
        midgame_player_uid: [],
        // startedAt: null,
        timeData: [],
      });

      handleClose();

      setToast({
        message: choosenLocation.id !== location.id
          ? 'You were wrong.'
          : 'You guessed the location correctly.',
        type: choosenLocation.id !== location.id
          ? 'danger'
          : 'success',
      });
    }
  };

  const handleClickLocation = lctn => {
    setChoosenLocation(lctn);
  };

  return (
    <ReactPortal wrapperId="react-portal-spy-location-modal-container">
      <div className="spy-location-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div>Location</div>
            <button onClick={handleClose} className="close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
          </div>

          <div className="location-list-block">
            {locations.map(item => (
              <div
                key={item.id}
                className={`list-item ${choosenLocation && choosenLocation.id === item.id ? 'checked' : ''}`}
                onClick={() => handleClickLocation(item)}
              >
                <img
                  className={item.checked ? 'checked' : ''}
                  alt={item.title}
                  src={IMAGES[item.id]}
                  loading="lazy" width="100" height="100"
                />
                <div>{item.title}</div>{item.checked}
                {item.checked && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="btn-block">
            <Button
              text="Make a Guess"
              colorOne="#0162c8"
              colorTwo="#55e7fc"
              onClick={handleClickMakeGuess}
            />
            <Button
              text="Cancel"
              colorOne="#755bea"
              colorTwo="#ff72c0"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export default SpyLocationModal;
