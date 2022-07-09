import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";

export const getSixLetterCode = () => {
  let code = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  while (code.length < 6) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
};

export const startGame = async ({
                                  uuid,
                                  gameId,
                                  setGameId,
                                  username,
                                  spyCount,
                                  minPlayers,
                                  setErrorMessage,
                                  navigate,
                                }) => {
  try {
    // update GameBlock room code list (check for duplicates)
    let codeArr = [];
    const codesDoc = await getDoc(doc(db, "game_room_codes", "code_array"));

    if (codesDoc.exists()) {
      codesDoc.data().codes.forEach((element) => {
        codeArr.push(element);
      });
      while (codeArr.indexOf(gameId) !== -1) {
        setGameId(getSixLetterCode());
      }
      codeArr.push(gameId);
      await updateDoc(doc(db, "game_room_codes/code_array"), {
        codes: codeArr,
      });
    } else {
      codeArr.push(gameId);
      await setDoc(doc(db, "game_room_codes/code_array"), {
        codes: codeArr,
      });
    }

    // add GameBlock room
    await setDoc(doc(db, `game_rooms/${gameId}`), {
      host_uid: uuid,
      spy_count: spyCount,
      min_player_count: minPlayers,
      player_data_arr: [{ username: username, uid: uuid, points: 0 }],
      banned_player_uid: [],
      game_room_closed: false,
      spy_uid: [],
      location: { title: '',  id: '' },
      ongoing_game: false,
      midgame_player_uid: [],

      vote_exhibited_uid: '',
      vote_exhibitor_uid: '',
      vote_score: {},
    });

    // navigate to new Game page
    navigate(`/game/${gameId}`);
  } catch (e) {
    console.error("Error adding document: ", e);
    setErrorMessage("please try again later");
  }
};

export const updateErrorMessage = ({
                              username,
                              spyCount,
                              setErrorMessage,
                            }) => {
  let error = "";
  if (!username && !spyCount) {
    error = "choose your settings";
  } else if (!username) {
    error = "enter your name";
  } else if (!spyCount) {
    error = "pick the number of spies";
  }
  setErrorMessage(error);
};
