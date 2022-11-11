import { useState } from "react";
import styles from "./Lifeline.module.css";

const Lifeline = (props) => {
  const [isClickable, setIsClickable] = useState(true);

  const handleClick = () => {
    props.onClick();
    setIsClickable(false);
  };

  const btnClasses = `d-flex justify-content-center align-items-center text-white ${
    props.className
  } ${styles.lifeline} ${isClickable ? "" : styles['disabled-button']}`;

  return (
    <button
      className={btnClasses}
      onClick={handleClick}
      disabled={isClickable ? false : true}
    >
      {props.children}
    </button>
  );
};

export default Lifeline;
