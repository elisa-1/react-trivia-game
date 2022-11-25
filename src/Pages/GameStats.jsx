import { useEffect } from "react";
import { UserAuth } from "../authContext/AuthContext";
import { getMostCommon } from "../services/utils";
import Spinner from "../components/UI/Spinner";
import styles from "./GameStats.module.css";

const GameStats = () => {
  const { user, getUserDoc, userData } = UserAuth();

  useEffect(() => {
    localStorage.clear();
    getUserDoc(user);
  }, [getUserDoc, user]);

  console.log();

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game-stats"]}`}
    >
      <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled p-4">
        {Object.keys(userData).length > 0 ? (
          <>
            <li>
              Number of games started: <strong>{userData.gamesStarted}</strong>{" "}
            </li>
            <br />
            <li>Number of games won ($1,000,000): </li>
            <li>Number of games ended (safety net): </li>
            <li>Number of games lost: raspuns incorect sau time expired </li>
            <li>Number of games abandoned: inchise din header </li>
            <br />
            <li>
              Preferred category:{" "}
              <strong>
                {userData.gamesStarted
                  ? getMostCommon(userData.categories)
                  : "-"}
              </strong>
            </li>
            <br />
            <li>Average time to answer: </li>
            <br />
            <li>
              Total number of lifelines used:{" "}
              <strong>{userData.lifelinesUsed}</strong>{" "}
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
