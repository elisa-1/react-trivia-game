import Lifeline from "./Lifeline";
import styles from "./LifelineBar.module.css";
import { IoIosPeople, IoIosCall } from "react-icons/io";

const LifelineBar = (props) => {
  return (
    <div
      className={`d-flex gap-3 ${props.className} ${styles["lifeline-bar"]}`}
    >
      <Lifeline
        className={`fw-bold ${props.lifelineClassName}`}
      >
        50:50
      </Lifeline>
      <Lifeline className={props.lifelineClassName}>
        <IoIosPeople className="h-75 w-75" />
      </Lifeline>
      <Lifeline className={props.lifelineClassName}>
        <IoIosCall className="h-75 w-75" />
      </Lifeline>
    </div>
  );
};

export default LifelineBar;
