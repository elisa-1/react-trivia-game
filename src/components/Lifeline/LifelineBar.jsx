import Lifeline from "./Lifeline";
import styles from "./LifelineBar.module.css";

const LifelineBar = (props) => {
  return (
    <div className={`d-flex gap-3 ${props.className} ${styles["lifeline-bar"]}`}>
      <Lifeline className={props.lifelineClassName} />
      <Lifeline className={props.lifelineClassName} />
      <Lifeline className={props.lifelineClassName} />
    </div>
  );
};

export default LifelineBar;
