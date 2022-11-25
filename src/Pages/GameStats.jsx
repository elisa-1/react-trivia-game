import { useEffect } from "react";
import { UserAuth } from "../authContext/AuthContext";
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
            <li>Number of games played: {userData.gamesPlayedNumber} </li>
            <li>Number of 1,000,000$ won: </li>
            <br />
            <li>Preferred category: </li>
            <br />
            <li>Highest amount won: </li>
            <li>Average amount won: </li>
            <li>Lowest amount won: </li>
            <br />
            <li>Average time to answer: </li>
            <br />
            <li>Total number of lifelines used: </li>
          </>
        ) : (
          <Spinner />
        )}
      </ul>
    </main>
  );
};

export default GameStats;
