import { Spinner as BSSpinner } from "react-bootstrap";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <BSSpinner animation="border" variant="primary" className={styles.spinner}>
      {" "}
    </BSSpinner>
  );
};

export default Spinner;
