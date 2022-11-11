import { useEffect, useState } from "react";
import { ProgressBar as BSProgressBar } from "react-bootstrap";
import styles from "./Timer.module.css";

const Timer = (props) => {
  const { timerValue, timerIsReset, timerIsPaused, handleTimeExpired } = props;
  const [remainingTime, setRemainingTime] = useState(timerValue);
  // const [timeExpired, setTimeExpired] = useState(false);

  useEffect(() => {
    let interval;

    if (!timerIsReset) {
      interval = setInterval(() => {
        if (!timerIsPaused) {
          setRemainingTime((prev) => prev - 1);
        }
      }, 1000);
    }
    if (timerIsReset) {
      setRemainingTime(timerValue);
    }
    if (remainingTime === 0) {
      if (interval) clearInterval(interval);
      handleTimeExpired();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    timerIsPaused,
    timerIsReset,
    remainingTime,
    handleTimeExpired,
    timerValue,
  ]);

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
