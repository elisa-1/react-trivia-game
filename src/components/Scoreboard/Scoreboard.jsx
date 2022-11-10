import { questionValues } from "../../services/constants";
import styles from "./Scoreboard.module.css";

const Scoreboard = () => {
  return (
    <ul
      className={`pt-3 pb-3 list-unstyled d-flex flex-column-reverse justify-content-center fw-bold ${styles.scoreboard}`}
    >
      {questionValues.map((question, index) => {
        return (
          <li className={`m-0 row ${question.type === 'safe' && styles['safe-question']}`} key={question.value}>
            <span className="col-2"></span>
            <span className="col-4 p-0 text-center">{index + 1}</span>
            <span className="col-4 p-0">
              $ {question.value.toLocaleString()}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Scoreboard;
