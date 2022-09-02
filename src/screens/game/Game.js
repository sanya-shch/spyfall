import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
  lazy,
  Suspense,
} from "react";
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

import { ToastContext } from "../../components/Toast";
import { db } from "../../firebase";
import { getUserId } from "../../helpers/userId";
import ConfirmModal from "../../components/ConfirmModal";
import VotingModal from "./components/VotingModal";
import SpyLocationModal from "./components/SpyLocationModal";
import Button from "../../components/RippleButton";
import Input from "../../components/Input";
import { getRandomLocationsData } from "../../helpers";
// import GameCard from "./components/GameCard";
// import GameBlock from "./components/GameBlock";
// import NameList from "./components/NameList";
// import CountdownTimer from "../../components/CountdownTimer";
import CircleButton from "../../components/CircleButton";
import Loader from "../../components/Loader";

import "./style.css";

const GameCard = lazy(() => import("./components/GameCard"));
const GameBlock = lazy(() => import("./components/GameBlock"));
const NameList = lazy(() => import("./components/NameList"));
const CountdownTimer = lazy(() => import("../../components/CountdownTimer"));

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

  const { setToast } = useContext(ToastContext);

  const isSpy = useMemo(
    () =>
      gameData?.spy_uid &&
      (uuid === gameData.spy_uid?.[0] ||
        (gameData.spy_uid?.length > 1 && uuid === gameData.spy_uid[1])),
    [gameData?.spy_uid, uuid]
  );

  const isInGame = useMemo(() => {
    if (gameData?.midgame_player_uid) {
      return !gameData.midgame_player_uid.includes(uuid);
    }
    return false;
  }, [gameData?.midgame_player_uid, uuid]);

  const checkIfGameExists = useCallback(async () => {
    const docSnap = await getDoc(doc(db, "game_rooms", id));
    if (!docSnap.exists()) {
      navigate("/error");
    }
  }, [navigate, id]);

  useEffect(() => {
    checkIfGameExists();
    const unsubscribe = onSnapshot(doc(db, "game_rooms", id), (doc) => {
      setGameData(doc.data());
      setDataLoaded(true);
    });
    return () => {
      unsubscribe();
    };
  }, [checkIfGameExists, id]);

  const getNumPlayersNeeded = useCallback(() => {
    setTotalPlayersNeeded(
      parseInt(gameData.min_player_count) - gameData.player_data_arr.length
    );
  }, [gameData?.min_player_count, gameData?.player_data_arr]);

  const checkIfUserExists = useCallback(() => {
    let userExists = false;
    gameData.player_data_arr.forEach((element) => {
      if (uuid === element.uid) {
        userExists = true;
      }
    });
    if (!userExists) {
      setShowJoinForm(true);
    }
  }, [gameData?.player_data_arr, uuid]);

  const checkIfBanned = useCallback(() => {
    if (gameData.banned_player_uid.indexOf(uuid) !== -1) {
      setBanned(true);
      setShowJoinForm(false);
    }
  }, [gameData?.banned_player_uid, uuid]);

  const leaveIfGameDeleted = useCallback(() => {
    if (gameData.game_room_closed) {
      navigate("/");
    }
  }, [gameData?.game_room_closed, navigate]);

  const checkGameStatus = useCallback(() => {
    if (gameData.ongoing_game) {
      setOngoingGame(true);
    } else {
      setOngoingGame(false);
    }
  }, [gameData?.ongoing_game, setOngoingGame]);

  const checkIfMidGamePlayer = useCallback(() => {
    if (gameData.midgame_player_uid.indexOf(uuid) !== -1) {
      setIsMidGamePlayer(true);
    } else {
      setIsMidGamePlayer(false);
    }
  }, [gameData?.midgame_player_uid, uuid]);

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
  }, [
    dataLoaded,
    gameData,
    checkGameStatus,
    checkIfBanned,
    checkIfMidGamePlayer,
    checkIfUserExists,
    getNumPlayersNeeded,
    leaveIfGameDeleted,
    uuid,
  ]);

  const handleChange = (value) => {
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

    gameData.player_data_arr.forEach((arr) => {
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

      const locationsData = getRandomLocationsData(30);
      await updateDoc(doc(db, "game_rooms", id), {
        spy_uid: randomUid,
        location: {
          title: locationsData.location.title,
          id: locationsData.location.id,
        },
        locations_list: locationsData.locationsList,
        ongoing_game: true,
        // startedAt: serverTimestamp(),
        timeData: arrayUnion({ time: Timestamp.now(), status: "start" }),
      });

      setOngoingGame(true);
    }
  }

  // restart game
  async function resetGame() {
    await updateDoc(doc(db, "game_rooms", id), {
      spy_uid: [],
      location: { title: "", id: "" },
      locations_list: [],
      ongoing_game: false,
      midgame_player_uid: [],
      // startedAt: null,
      timeData: [],
    });
    checkIfMidGamePlayer();
    setOngoingGame(false);
    // setShowJoinForm(false);
    // checkedArr = [];
  }

  // components
  const CopyCode = (props) => {
    function copyLinkToClipboard() {
      copy(document.URL);

      setToast({
        message: "Copied",
        type: "success",
      });
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
      setIsSpyLocationModalOpen(false);
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
      timeData: arrayUnion({ time: Timestamp.now(), status: "pause" }),
    });
  }

  // beforeunload
  // useEffect(() => {
  //   const handleWindowBeforeUnload = () => {
  //     console.log("beforeunload");
  //   };
  //
  //   window.addEventListener('beforeunload', handleWindowBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleWindowBeforeUnload);
  //   };
  // }, []);

  // countdown timer score
  const timerScore = useMemo(
    () =>
      gameData?.timeData?.at(-1)?.status === "start"
        ? gameData.timeData.reduce((acc, timeItem, index) => {
            if (index === 0) {
              return 0;
            }

            return timeItem.status === "start"
              ? acc + timeItem.time.toMillis()
              : acc - timeItem.time.toMillis();
          }, 0)
        : "pause",
    [gameData?.timeData]
  );
  const countdown = useMemo(
    () =>
      gameData?.timeData?.length &&
      (timerScore !== "pause"
        ? gameData.timeData[0].time.toMillis() + tenMinutes + timerScore
        : "pause"),
    [gameData?.timeData, timerScore]
  );

  // toasts
  // useEffect(() => {
  //   if (showJoinForm) {
  //     setToast({
  //       message: "Enter a USERNAME to join a game.",
  //       type: 'info',
  //     });
  //   }
  // }, [showJoinForm, setToast]);

  useEffect(() => {
    if (gameData?.lastGameSpy) {
      if (
        uuid !== gameData.lastGameSpy.spyUid &&
        gameData.lastGameSpy?.toasts?.length
      ) {
        gameData.lastGameSpy.toasts.forEach((item) => {
          setToast({
            message: item.message,
            type: item.type,
            autoClose: 20000,
          });
        });
      }

      if (isHost) {
        updateDoc(doc(db, "game_rooms", id), {
          lastGameSpy: null,
        });
      }
    }
  }, [gameData?.lastGameSpy, setToast, id, isHost, uuid]);

  const handlerCountdownTimer = useCallback(() => {
    if (ongoingGame) {
      setToast({
        message: "Round over!",
        type: "danger",
      });

      if (isSpy) {
        const player_data_arr = gameData.player_data_arr.map((player) => {
          if (player.uid === uuid) {
            return { ...player, points: player.points + 2 };
          }

          return player;
        });

        const spyData = gameData.player_data_arr.find(
          (item) => item.uid === uuid
        );

        updateDoc(doc(db, "game_rooms", id), {
          vote_exhibited_uid: "",
          vote_exhibitor_uid: "",
          vote_score: {},

          player_data_arr,
          lastGameSpy: {
            spyUid: uuid,
            toasts: [
              {
                message: `${spyData?.username || "???"} was a spy.`,
                type: "info",
              },
            ],
          },

          spy_uid: [],
          location: { title: "", id: "" },
          locations_list: [],
          ongoing_game: false,
          midgame_player_uid: [],
          // startedAt: null,
          timeData: [],
        });

        setToast({
          message: "You have received two points.",
          type: "success",
        });
      }
    }
  }, [gameData?.player_data_arr, id, isSpy, setToast, uuid, ongoingGame]);

  return (
    <section className="players">
      <h2
        className="game-title"
        onClick={() => navigate("/")}
        tabIndex={0}
        role="button"
      >
        SPYFALL
      </h2>

      {(!ongoingGame || isHost) && !banned && <CopyCode id={id} />}

      {!!countdown &&
        countdown !== "pause" &&
        ongoingGame &&
        !isMidGamePlayer &&
        !showJoinForm &&
        !banned && (
          <Suspense fallback={<Loader isFullScreen={false} />}>
            <CountdownTimer
              countToDate={new Date(countdown)}
              stop={isVoteModalOpen}
              callback={handlerCountdownTimer}
            />
          </Suspense>
        )}

      {ongoingGame && !isMidGamePlayer && !showJoinForm && isInGame && !banned && (
        <Suspense fallback={<Loader isFullScreen={false} />}>
          <GameCard isSpy={isSpy} locationData={gameData?.location} />
        </Suspense>
      )}

      {gameData && !banned && (
        <Suspense fallback={<Loader isFullScreen={false} />}>
          <NameList
            playersList={gameData.player_data_arr}
            minPlayerCount={gameData.min_player_count}
            spyCount={gameData.spy_count}
            onClickKick={(index) => {
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
        </Suspense>
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

      {ongoingGame && !banned && (
        <Suspense fallback={<Loader isFullScreen={false} />}>
          <GameBlock
            isSpy={isSpy}
            isMidGamePlayer={isMidGamePlayer}
            showJoinForm={showJoinForm}
            ongoingGame={ongoingGame}
            locationsList={gameData?.locations_list}
          />
        </Suspense>
      )}

      {banned ? (
        <Banned />
      ) : !isMidGamePlayer ? (
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
      )}

      {showJoinForm && !banned && (
        <div className="join-block">
          <Input
            value={userName}
            label="username"
            maxLength={15}
            onChange={handleChange}
          />
          <CircleButton
            handleClick={handleClickJoin}
            text="Join Game"
            svg={
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5" />
                <polyline points="8 1 12 5 8 9" />
              </svg>
            }
          />
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
          isSpy={isSpy}
        />
      )}

      {isSpyLocationModalOpen && (
        <SpyLocationModal
          handleClose={() => {
            setIsSpyLocationModalOpen(false);
          }}
          isOpen={isSpyLocationModalOpen}
          playerData={gameData?.player_data_arr}
          location={gameData?.location}
          locationsList={gameData?.locations_list}
          id={id}
          uuid={uuid}
        />
      )}
    </section>
  );
};

export default Game;
