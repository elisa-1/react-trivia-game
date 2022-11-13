import { useEffect } from "react";
import styles from "./GameStats.module.css";

const GameStats = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game-stats"]}`}
    >
      <ul className="d-flex flex-column justify-content-center align-items-center list-unstyled p-4">
        <li>Number of games played: 10</li>
        <li>Number of 1,000,000$ won: 2</li>
        <br />
        <li>Preferred category: Geography</li>
        <br />
        <li>Highest amount won: 1,000,000$</li>
        <li>Average amount won: 64,000$</li>
        <li>Lowest amount won: 0$</li>
        <br />
        <li>Average time to answer: 8s</li>
        <br />
        <li>Total number of lifelines used: 30</li>
      </ul>
    </main>
  );
};

export default GameStats;
