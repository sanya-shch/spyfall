import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  Timestamp,
  // serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase";
import { getUserId } from "../../helpers/userId";
import ConfirmModal from "../../components/ConfirmModal";
import VotingModal from "./components/VotingModal";
import SpyLocationModal from "./components/SpyLocationModal";
import Button from "../../components/RippleButton";
import Input from "../../components/Input";
import { getLocationData } from "../../helpers";
import GameCard from "./components/GameCard";
import GameBlock from "./components/GameBlock";
import NameList from "./components/NameList";
import CountdownTimer from "../../components/CountdownTimer";

import './style.css';

const tenMinutes = 10 * 60 * 1000;

const Game = () => {
  let { id } = useParams();
  id = id.toUpperCase();

  const [gameData, setGameData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userName, setUserName] = useState();
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [isHost, setIsHost] = useState();
  const [kickIndex, setKickIndex] = useState();
  const [banned, setBanned] = useState(false);
  const [totalPlayersNeeded, setTotalPlayersNeeded] = useState();
  const [ongoingGame, setOngoingGame] = useState(false);
  const [isMidGamePlayer, setIsMidGamePlayer] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isKickModalOpen, setIsKickModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isPutToVoteModalOpen, setIsPutToVoteModalOpen] = useState(false);
  const [isSpyLocationModalOpen, setIsSpyLocationModalOpen] = useState(false);

  const [exhibited, setExhibited] = useState();

  // let checkedArr = [];

  const uuid = getUserId();
  const navigate = useNavigate();

  // setting up initial game data
  useEffect(() => {
    checkIfGameExists();
    const unsubscribe = onSnapshot(doc(db, "game_rooms", id), (doc) => {
      setGameData(doc.data());
      setDataLoaded(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      leaveIfGameDeleted();
      checkIfUserExists();
      checkIfBanned();
      getNumPlayersNeeded();
      checkGameStatus();
      checkIfMidGamePlayer();
      if (gameData.host_uid === uuid) {
        setIsHost(true);
      }
    }
  }, [dataLoaded, gameData]);

  const isSpy = useMemo(() => gameData?.spy_uid && (uuid === gameData.spy_uid?.[0] ||
    (gameData.spy_uid?.length > 1 && uuid === gameData.spy_uid[1])), [gameData?.spy_uid, uuid]);

  function getNumPlayersNeeded() {
    setTotalPlayersNeeded(
      parseInt(gameData.min_player_count) - gameData.player_data_arr.length
    );
  }

  // checking for errors
  async function checkIfGameExists() {
    const docSnap = await getDoc(doc(db, "game_rooms", id));
    if (!docSnap.exists()) {
      navigate("/error");
    }
  }

  // adding players
  function checkIfUserExists() {
    let userExists = false;
    gameData.player_data_arr.forEach((element) => {
      if (uuid === element.uid) {
        userExists = true;
      }
    });
    if (!userExists) {
      setShowJoinForm(true);
    }
  }

  const handleChange = value => {
    setUserName(value);
  };

  const handleClickJoin = async () => {
    setShowJoinForm(false);

    await updateDoc(doc(db, "game_rooms", id), {
      player_data_arr: arrayUnion({ username: userName, uid: uuid, points: 0 }),
    });
    if (ongoingGame) {
      await updateDoc(doc(db, "game_rooms", id), {
        midgame_player_uid: arrayUnion(uuid),
      });
    }
  };

  // removing players
  async function leaveGame() {
    let username = "";
    let points = 0;

    gameData.player_data_arr.forEach(arr => {
      if (arr.uid === uuid) {
        username = arr.username;
        points = arr.points;
      }
    });
    await updateDoc(doc(db, "game_rooms", id), {
      player_data_arr: arrayRemove({
        username: username,
        uid: uuid,
        points,
      }),
    });
    navigate("/");
  }

  async function kickPlayer(index) {
    const username = gameData.player_data_arr[index].username;
    const uid = gameData.player_data_arr[index].uid;
    const points = gameData.player_data_arr[index].points;

    await updateDoc(doc(db, "game_rooms", id), {
      banned_player_uid: arrayUnion(uid),
      player_data_arr: arrayRemove({
        username: username,
        uid: uid,
        points,
      }),
    });
  }

  function checkIfBanned() {
    if (gameData.banned_player_uid.indexOf(uuid) !== -1) {
      setBanned(true);
      setShowJoinForm(false);
    }
  }

  // deleting room
  async function deleteRoom() {
    await updateDoc(doc(db, "game_rooms", id), {
      game_room_closed: true,
    });
    await deleteDoc(doc(db, "game_rooms", id));
    await updateDoc(doc(db, "game_room_codes", "code_array"), {
      codes: arrayRemove(id),
    });
  }

  function leaveIfGameDeleted() {
    if (gameData.game_room_closed) {
      navigate("/");
    }
  }

  // start game
  async function startGame() {
    if (
      !ongoingGame &&
      gameData.player_data_arr.length >= gameData.min_player_count
    ) {
      let randomUid = [];
      const spyOne = Math.floor(
        Math.random() * gameData.player_data_arr.length
      );
      randomUid.push(gameData.player_data_arr[spyOne].uid);
      if (parseInt(gameData.spy_count) === 2) {
        let spyTwo = Math.floor(
          Math.random() * gameData.player_data_arr.length
        );
        while (gameData.player_data_arr.length > 1 && spyOne === spyTwo) {
          spyTwo = Math.floor(Math.random() * gameData.player_data_arr.length);
        }
        randomUid.push(gameData.player_data_arr[spyTwo].uid);
      }

      const locationData = getLocationData();
      await updateDoc(doc(db, "game_rooms", id), {
        spy_uid: randomUid,
        location: { title: locationData.title,  id: locationData.id },
        ongoing_game: true,
        // startedAt: serverTimestamp(),
        timeData: arrayUnion({ time: Timestamp.now(), status: 'start' }),
      });

      setOngoingGame(true);
    }
  }

  function checkGameStatus() {
    if (gameData.ongoing_game) {
      setOngoingGame(true);
    } else {
      setOngoingGame(false);
    }
  }

  // restart game
  async function resetGame() {
    await updateDoc(doc(db, "game_rooms", id), {
      spy_uid: [],
      location: { title: '',  id: '' },
      ongoing_game: false,
      midgame_player_uid: [],
      // startedAt: null,
      timeData: [],
    });
    checkIfMidGamePlayer();
    setOngoingGame(false);
    showJoinForm(false);
    // checkedArr = [];
  }

  function checkIfMidGamePlayer() {
    if (gameData.midgame_player_uid.indexOf(uuid) !== -1) {
      setIsMidGamePlayer(true);
    } else {
      setIsMidGamePlayer(false);
    }
  }

  // components
  const CopyCode = (props) => {
    function copyLinkToClipboard() {
      copy(document.URL);
    }

    return (
      <div className="copy-code-block">
        <div className="code-block">
          Room code:
          <div
            onClick={copyLinkToClipboard}
            onTouchStart={copyLinkToClipboard}
            className="code-item"
          >
            {props.id}
          </div>
        </div>
        <div className="italic">(click to copy link)</div>
      </div>
    );
  };

  const Banned = () => {
    return (
      <div className="banned-block">
        Looks like the owner of this room has banned you 🤔
      </div>
    );
  };

  // vote
  useEffect(() => {
    if (gameData?.vote_exhibited_uid) {
      setIsVoteModalOpen(true);
    } else {
      setIsVoteModalOpen(false);
    }
  }, [gameData]);

  useEffect(() => {
    if (exhibited) setIsPutToVoteModalOpen(true);
  }, [exhibited]);

  function putToVoteOpenModal(uid) {
    setExhibited(uid);
  }

  function putToVote(uid) {
    updateDoc(doc(db, "game_rooms", id), {
      vote_exhibited_uid: uid,
      vote_exhibitor_uid: uuid,
      timeData: arrayUnion({ time: Timestamp.now(), status: 'pause' }),
    });
  }

  // beforeunload
  useEffect(() => {
    const handleWindowBeforeUnload = () => {
      console.log("beforeunload");
    };

    window.addEventListener('beforeunload', handleWindowBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleWindowBeforeUnload);
    };
  }, []);

  // countdown timer score
  const timerScore = useMemo(() => gameData?.timeData?.at(-1)?.status === 'start' &&
    gameData.timeData.reduce((acc, timeItem, index) => {
      if (index === 0) {
        return 0;
      }

      return timeItem.status === 'start' ? acc + timeItem.time.toMillis() : acc - timeItem.time.toMillis();
    }, 0),
    [gameData?.timeData]
  );
  const countdown = useMemo(() => (
      gameData?.timeData?.length && gameData.timeData[0].time.toMillis() + tenMinutes + timerScore
    ),
    [gameData?.timeData, timerScore]
  );

  return (
    <section className="players">
      <h2
        className="game-title"
        onClick={() => navigate('/')}
        tabIndex={0}
        role="button"
      >
        SPYFALL
      </h2>

      {(!ongoingGame || isHost) && <CopyCode id={id} />}

      {!!countdown && ongoingGame && (
        <CountdownTimer
          countdown={new Date(countdown)}
          callback={() => {
            console.log("CountdownTimerEnd");

            if (isSpy) {
              const player_data_arr = gameData.player_data_arr.map(player => {
                if (player.uid === uuid) {
                  return { ...player, points: player.points + 2 }
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
          }}
        />
      )}

      {ongoingGame &&
      !isMidGamePlayer &&
      !showJoinForm && (
        <GameCard isSpy={isSpy} locationData={gameData?.location} />
      )}

      {gameData && (
        <NameList
          playersList={gameData.player_data_arr}
          minPlayerCount={gameData.min_player_count}
          spyCount={gameData.spy_count}
          onClickKick={index => {
            setKickIndex(index);
            setIsKickModalOpen(true);
          }}
          isHost={isHost}
          hostUid={gameData.host_uid}
          ongoingGame={ongoingGame}
          putToVote={putToVoteOpenModal}
          uuid={uuid}
          isSpy={isSpy}
          isMidGamePlayer={isMidGamePlayer}
          showJoinForm={showJoinForm}
        />
      )}

      {isSpy && (
        <div className="btn-block">
          <Button
            text="make a guess about the location"
            colorOne="#0162c8"
            colorTwo="#55e7fc"
            onClick={() => setIsSpyLocationModalOpen(true)}
          />
        </div>
      )}

      {ongoingGame && (
        <GameBlock
          isSpy={isSpy}
          isMidGamePlayer={isMidGamePlayer}
          showJoinForm={showJoinForm}
          ongoingGame={ongoingGame}
        />
      )}

      {banned ? (
        <Banned />
        ) : (!isMidGamePlayer ? (
          !isHost &&
          !showJoinForm &&
          !ongoingGame && (
            <div className="join-block">
              <Button
                text="Leave ↪"
                colorOne="#755bea"
                colorTwo="#ff72c0"
                onClick={() => setIsLeaveModalOpen(true)}
              />
            </div>
          )
        ) : (
          <div className="join-block">
            <Button
              text="Leave ↪"
              colorOne="#755bea"
              colorTwo="#ff72c0"
              onClick={() => setIsLeaveModalOpen(true)}
            />
          </div>
        )
      )}

      {showJoinForm && !banned && (
        <div className="join-block">
          <Input
            value={userName}
            label="username"
            maxLength={15}
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
      )}

      {isHost && (
        <div className="btn-block">
          <Button
            text="Delete Room ×"
            colorOne="#755bea"
            colorTwo="#ff72c0"
            onClick={() => setIsDeleteModalOpen(true)}
          />
          {!ongoingGame ? (
            totalPlayersNeeded === 0 && (
              <Button
                text="Start Game →"
                colorOne="#0162c8"
                colorTwo="#55e7fc"
                onClick={() => startGame()}
              />
            )
          ) : (
            <Button
              text="Reset Game ↬"
              colorOne="#0162c8"
              colorTwo="#55e7fc"
              onClick={() => resetGame()}
            />
          )}
        </div>
      )}

      {!ongoingGame && (
        <div className="italic block-info">
          {totalPlayersNeeded <= 0
            ? ""
            : `need ${totalPlayersNeeded} more
        ${totalPlayersNeeded === 1 ? "player" : "players"} to begin`}
        </div>
      )}

      <ConfirmModal
        handleClose={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
        confirmAction={deleteRoom}
        btnTitle="Delete Room"
        title="Delete Room"
        description="Are you sure you want to delete your room? All other players will be kicked out of this room aswell."
      />
      <ConfirmModal
        handleClose={() => setIsKickModalOpen(false)}
        isOpen={isKickModalOpen}
        confirmAction={() => {
          kickPlayer(kickIndex);
          setIsKickModalOpen(false);
        }}
        btnTitle="Kick Player"
        title="Kick Player"
        description="Are you sure you want to kick this player? They will be banned from the room and unable to join again."
      />
      <ConfirmModal
        handleClose={() => setIsLeaveModalOpen(false)}
        isOpen={isLeaveModalOpen}
        confirmAction={leaveGame}
        btnTitle="Leave"
        title="Leave Game"
        description="Are you sure you want to leave this game? You can join again later!"
      />
      <ConfirmModal
        handleClose={() => {
          setIsPutToVoteModalOpen(false);
          setExhibited(null);
        }}
        isOpen={isPutToVoteModalOpen}
        confirmAction={() => {
          setIsPutToVoteModalOpen(false);
          // setIsVoteModalOpen(true);

          if (exhibited.uid) putToVote(exhibited.uid);

          setExhibited(null);
        }}
        btnTitle="Put To Vote"
        title="Put To Vote"
        description={`Are you sure that you want to put ${exhibited?.username} to the vote?`}
      />

      {isVoteModalOpen && (
        <VotingModal
          handleClose={() => {
            setIsVoteModalOpen(false);
            // setExhibited(null);
          }}
          isOpen={isVoteModalOpen}
          exhibitedUid={gameData?.vote_exhibited_uid}
          exhibitorUid={gameData?.vote_exhibitor_uid}
          voteScore={gameData?.vote_score}
          playerData={gameData?.player_data_arr}
          id={id}
          uuid={uuid}
          spyUid={gameData?.spy_uid}
          isHost={isHost}
        />
      )}

      <SpyLocationModal
        handleClose={() => {
          setIsSpyLocationModalOpen(false);
        }}
        isOpen={isSpyLocationModalOpen}
        playerData={gameData?.player_data_arr}
        location={gameData?.location}
        id={id}
        uuid={uuid}
      />
    </section>
  );
};

export default Game;

// Round over!
