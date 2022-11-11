import { questionValues } from "../../services/constants";
import styles from "./Scoreboard.module.css";

const Scoreboard = (props) => {
  return (
    <ul
      className={`pt-3 pb-3 list-unstyled d-flex flex-column-reverse justify-content-center fw-bold m-0 ${styles.scoreboard}`}
    >
      {questionValues.map((question, index) => {
        return (
          <li
            className={`m-0 row ${styles.question}
            ${question.type === "safe" && styles["safe-question"]}
            ${props.questionNo === index && styles["current-question"]}`}
            key={question.value}
          >
            <span className="d-none d-md-inline col-md-3 col-lg-4 col-xl-5 p-0 text-center">
              {index + 1}
            </span>
            <span className="col-md-9 col-lg-8 col-xl-6 p-0">
              $ {question.value.toLocaleString()}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Scoreboard;
