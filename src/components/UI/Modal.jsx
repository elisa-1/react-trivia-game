import Button from "./Button";
import { Modal as BSModal } from "react-bootstrap";
import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <BSModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={`${styles["modal-content"]}`}
      backdropClassName={`${styles["modal-backdrop"]}`}
    >
      <BSModal.Header closeButton className="border-0">
        <BSModal.Title>Modal heading</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body className={`${styles['modal-body']}`}>
        <p>
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </BSModal.Body>
      <BSModal.Footer className={`border-0`}>
        <Button onClick={props.onHide}>Close</Button>
      </BSModal.Footer>
    </BSModal>
  );
}

export default Modal;
