import { useState } from "react";
import styles from "./Lifeline.module.css";

const Lifeline = (props) => {
  const [isClickable, setIsClickable] = useState(true);

  const handleClick = (type) => {
    props.onClick();
    setIsClickable(false);
    localStorage.setItem(`${type}`, "clicked");
  };

  const disabledState =
    localStorage.getItem(props.type) === "clicked"
      ? true
      : isClickable
      ? false
      : true;

  const btnClasses = `d-flex justify-content-center align-items-center text-white ${
    props.className
  } ${styles.lifeline} ${!disabledState ? "" : styles["disabled-button"]}`;

  return (
    <button
      className={btnClasses}
      onClick={() => handleClick(props.type)}
      disabled={disabledState}
    >
      {props.children}
    </button>
  );
};

export default Lifeline;
