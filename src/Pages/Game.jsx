import { useParams } from "react-router-dom";
import styles from "./Game.module.css";

const Game = () => {
  const { category } = useParams();

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game"]}`}
    >
      <div>{category}</div>
      <div></div>
    </main>
  );
};

export default Game;
