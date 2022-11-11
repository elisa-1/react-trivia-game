import Button from "./Button";
import { Modal as BSModal } from "react-bootstrap";
import styles from "./Modal.module.css";
import AskAudienceBars from "../Lifeline/AskAudienceBars";

const Modal = (props) => {
  return (
    <BSModal
      onHide={props.onHide}
      show={props.show}
      centered
      backdrop={props.backdrop}
      contentClassName={`${styles["modal-content"]}`}
      backdropClassName={`${styles["modal-backdrop"]} ${
        styles[props.modalAdditionalClass]
      }`}
    >
      <BSModal.Header className="border-0"></BSModal.Header>
      <BSModal.Body className={`text-center ${styles["modal-body"]}`}>
        <p className="m-0">{props.content}</p>
        {props.modalAskAudience?.state && (
          <AskAudienceBars
            answers={props.modalAskAudience.answers}
            correctAnswer={props.modalAskAudience.correctAnswer}
          />
        )}
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
