import { useEffect, useState } from "react";
import { ProgressBar as BSProgressBar } from "react-bootstrap";
import styles from "./Timer.module.css";

const Timer = (props) => {
  const [remainingTime, setRemainingTime] = useState(props.timerValue);
  const { handleTimeExpired } = props;

  useEffect(() => {
    if (remainingTime === 0) {
      handleTimeExpired();
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, handleTimeExpired]);

  return (
    <div className={styles.timer}>
      <span className="d-block text-center text-white">{remainingTime}</span>
      <BSProgressBar
        className="rounded"
        max={props.timerValue}
        min={0}
        now={remainingTime}
      />
    </div>
  );
};

export default Timer;
