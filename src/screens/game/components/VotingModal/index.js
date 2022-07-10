import React, { useEffect, useMemo, useContext } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";

import { ToastContext } from "../../../../components/Toast";
import { db } from "../../../../firebase";
import ReactPortal from "../../../../components/ConfirmModal/ReactPortal";
import Button from "../../../../components/RippleButton";
import CircleTimer from "../../../../components/CircleTimer";

import './style.css';

// const time = 3;

function VotingModal({
                       id,
                       uuid,
                       handleClose,
                       isOpen,
                       exhibitedUid,
                       exhibitorUid,
                       voteScore,
                       playerData,
                       spyUid,
                       isHost,
                       isSpy,
                     }) {
  const exhibited = useMemo(() => playerData.find(player => player.uid === exhibitedUid), [playerData, exhibitedUid]);
  const exhibitor = useMemo(() => playerData.find(player => player.uid === exhibitorUid), [playerData, exhibitorUid]);

  const { setToast } = useContext(ToastContext);

  const isVotingOver = useMemo(() => playerData
      .filter(player => player.uid !== exhibitedUid)
      .every(player => voteScore?.[player.uid] && voteScore[player.uid] === 'spy'),
    [playerData, voteScore, exhibitedUid]
  );
  const isAllPlayerVoting = useMemo(() => playerData
      .filter(player => player.uid !== exhibitedUid)
      .every(player => voteScore?.[player.uid]),
    [playerData, voteScore, exhibitedUid]
  );

  useEffect(() => {
    let timer;

    if (isAllPlayerVoting) {
      timer = setTimeout(() => {
        if (isHost) {
          if (!isVotingOver) {
            updateDoc(doc(db, "game_rooms", id), {
              vote_exhibited_uid: '',
              vote_exhibitor_uid: '',
              vote_score: {},
              timeData: arrayUnion({ time: Timestamp.now(), status: 'start' }),
            });
          } else {
            const isExhibitedSpy = spyUid.includes(exhibitedUid);

            const player_data_arr = isExhibitedSpy
              ? playerData.map(player => {
                if (exhibitorUid === player.uid) {
                  return { ...player, points: player.points + 2 };
                }
                if (!spyUid.includes(player.uid)) {
                  return { ...player, points: player.points + 1 };
                }

                return player;
              })
              : playerData.map(player => {
                if (spyUid.includes(player.uid)) {
                  return { ...player, points: player.points + 4 }
                }

                return player;
              });

            updateDoc(doc(db, "game_rooms", id), {
              vote_exhibited_uid: '',
              vote_exhibitor_uid: '',
              vote_score: {},

              player_data_arr,

              spy_uid: [],
              location: { title: '',  id: '' },
              ongoing_game: false,
              midgame_player_uid: [],
              // startedAt: null,
              timeData: [],
            });
          }
        }

        setToast({
          message: !isVotingOver
            ? 'Voting failed'
            : isVotingOver && spyUid.includes(exhibitedUid)
              ? spyUid.includes(uuid)
                ? 'You are exposed.'
                : 'Spy exposed.'
              : spyUid.includes(uuid)
                ? 'The players made a mistake.'
                : 'Unfortunately, this player is not a spy.',
          type: !isVotingOver
            ? 'danger'
            : isVotingOver && spyUid.includes(exhibitedUid)
              ? spyUid.includes(uuid)
                ? 'danger'
                : 'success'
              : spyUid.includes(uuid)
                ? 'success'
                : 'danger',
        });

        if (!isSpy) {
          const spyData = playerData.find(player => spyUid.includes(player.uid));

          setToast({
            message: `${spyData?.username || '???'} was a spy.`,
            type: 'info',
          });
        }

        handleClose();
      }, 12000);
    }

    return () => clearTimeout(timer);
  }, [
    isVotingOver,
    isAllPlayerVoting,
    exhibitedUid,
    exhibitorUid,
    handleClose,
    id,
    isHost,
    playerData,
    setToast,
    spyUid,
    uuid,
    isSpy,
  ]);

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

  const handleClickSpy = () => {
    updateDoc(doc(db, "game_rooms", id), {
      [`vote_score.${uuid}`]: 'spy'
    });
  };

  const handleClickNotASpy = () => {
    updateDoc(doc(db, "game_rooms", id), {
      [`vote_score.${uuid}`]: 'not_spy'
    });
  };

  return (
    <ReactPortal wrapperId="react-portal-voting-modal-container">
      <div className="voting-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div>VOTE</div>
            {/*<button onClick={handleClose} className="close-btn">*/}
            {/*  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">*/}
            {/*    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>*/}
            {/*  </svg>*/}
            {/*</button>*/}

            {isAllPlayerVoting && <CircleTimer />}
            {/* isAllPlayerVoting && <CircleTimer time={time || 0.75} /> */}
          </div>

          <div className="modal-description"><span>{exhibitor?.username}</span> put <span>{exhibited?.username}</span> to the vote</div>

          <div className="list-block">
            {playerData.map((player) => player.uid !== exhibitedUid && (
              <div key={player.uid} className="list-item">
                {player.username}

                {voteScore?.[player.uid] === 'spy' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="like" viewBox="0 0 16 16">
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                  </svg>
                ) : voteScore?.[player.uid] === 'not_spy' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="dislike" viewBox="0 0 16 16">
                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dcddd8" className="dash" viewBox="0 0 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="btn-block">
            {isVotingOver ? (
              <h2>voting is over</h2>
            ) : exhibitedUid !== uuid ? (
              <>
                <Button
                  text="Not a spy"
                  colorOne="#0162c8"
                  colorTwo="#55e7fc"
                  onClick={handleClickNotASpy}
                />
                <Button
                  text="Spy"
                  colorOne="#755bea"
                  colorTwo="#ff72c0"
                  onClick={handleClickSpy}
                />
              </>
            ) : (
              <h2>you cannot vote</h2>
            )}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export default VotingModal;
