import styles from "./Lifeline.module.css";

const Lifeline = (props) => {
  return (
    <div
      className={`${props.className} d-flex justify-content-center align-items-center text-white ${styles.lifeline}`}
    >
      Lifeline
    </div>
  );
};

export default Lifeline;
