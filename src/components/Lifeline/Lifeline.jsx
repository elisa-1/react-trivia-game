import styles from "./Lifeline.module.css";

const Lifeline = (props) => {
  return (
    <button
      className={`${props.className} d-flex justify-content-center align-items-center text-white ${styles.lifeline}`}
    >
      {props.children}
    </button>
  );
};

export default Lifeline;
