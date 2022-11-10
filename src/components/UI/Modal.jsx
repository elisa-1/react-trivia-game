import Button from "./Button";
import { Modal as BSModal } from "react-bootstrap";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <BSModal
      show={props.show}
      centered
      backdrop={props.backdrop}
      contentClassName={`${styles["modal-content"]}`}
      backdropClassName={`${styles["modal-backdrop"]} ${styles[props.modalAdditionalClass]}`}
    >
      <BSModal.Header className="border-0"></BSModal.Header>
      <BSModal.Body className={`text-center ${styles["modal-body"]}`}>
        <p className="m-0">{props.content}</p>
      </BSModal.Body>
      <BSModal.Footer className={`m-0 border-0 d-flex justify-content-center`}>
        {props.closeModal ? (
          <Button onClick={props.onHide}>Close</Button>
        ) : (
          <Button onClick={props.goToMainMenu}>Return to Main Menu</Button>
        )}
      </BSModal.Footer>
    </BSModal>
  );
};

export default Modal;
