import { ImExit } from "react-icons/im";
import styles from "./Exit.module.css";
import { UI_TEXT, questionValues } from "../../services/constants";
import { getValueWon } from "../../services/utils";

const Exit = (props) => {
  const exitBtnClasses = `py-2 d-flex flex-column justify-content-center align-items-center text-white ${styles.exit}`;

  const valueWon = getValueWon(
    questionValues[props.questionNo].value - 1,
    questionValues
  );

  const saveValueWon = (value) => {
    return props.handleExit(value);
  };

  const handleClick = () => {
    props.handleExit();
    saveValueWon(valueWon);
  };

  return (
    <button className={exitBtnClasses} onClick={handleClick}>
      <ImExit className="w-50 h-50" />
      <span>
        {UI_TEXT.exitButtonMessage} {valueWon}
      </span>
    </button>
  );
};

export default Exit;
