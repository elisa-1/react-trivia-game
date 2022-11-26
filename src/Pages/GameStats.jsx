import { useEffect } from "react";
import { UserAuth } from "../authContext/AuthContext";
import { getMostCommon } from "../services/utils";
import { UI_TEXT } from "../services/constants";
import Spinner from "../components/UI/Spinner";
import styles from "./GameStats.module.css";

const GameStats = () => {
  const { user, getUserDoc, userData } = UserAuth();

  useEffect(() => {
    localStorage.clear();
    getUserDoc(user);
  }, [getUserDoc, user]);

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game-stats"]}`}
    >
      <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled p-4">
        {Object.keys(userData).length > 0 ? (
          <>
            <li>
              {UI_TEXT.gameStats.gamesStarted}
              <span>{userData.gamesStarted}</span>
            </li>
            <br />
            <li>
              {UI_TEXT.gameStats.gamesWon}
              <span>{userData.gamesWon}</span>
            </li>
            <li>
              {UI_TEXT.gameStats.gamesEnded}
              <span>{userData.gamesEnded}</span>
            </li>
            <li>
              {UI_TEXT.gameStats.gamesLost}
              <span>{userData.gamesLost}</span>
            </li>
            <li>
              {UI_TEXT.gameStats.gamesAbandoned}
              <span>
                {userData.gamesStarted -
                  userData.gamesWon -
                  userData.gamesEnded -
                  userData.gamesLost}
              </span>
            </li>
            <br />
            <li>
              {UI_TEXT.gameStats.preferredCategory}
              <span>
                {userData.gamesStarted
                  ? getMostCommon(userData.categories)
                  : "-"}
              </span>
            </li>
            <br />
            <li> {UI_TEXT.gameStats.averageTimeToAnswer}</li>
            <br />
            <li>
              {UI_TEXT.gameStats.lifelinesUsed}
              <span>{userData.lifelinesUsed}</span>{" "}
            </li>
          </>
        ) : (
          <Spinner />
        )}
      </ul>
    </main>
  );
};

export default GameStats;
