import { useState } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { UserAuth } from "../../authContext/AuthContext";
import styles from "./Lifeline.module.css";

const Lifeline = (props) => {
  const [isClickable, setIsClickable] = useState(true);
  const { user, userDocId } = UserAuth();

  const updateLifelinesNumberDoc = async () => {
    const userDoc = doc(db, "stats", userDocId);
    await updateDoc(userDoc, {
      lifelinesUsed: increment(1),
    });
  };

  const handleClick = (type) => {
    props.onClick();
    setIsClickable(false);
    localStorage.setItem(`${type}`, "clicked");
    if (user) updateLifelinesNumberDoc();
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
