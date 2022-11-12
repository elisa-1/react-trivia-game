import { useNavigate } from "react-router-dom";
import useModal from "../../modalContext/ModalContext";
import { UI_TEXT } from "../../services/constants";
import { Modal as BSModal } from "react-bootstrap";
import AskAudienceBars from "../Lifeline/AskAudienceBars";
import Button from "./Button";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const navigate = useNavigate();
  const { navigateTo } = props;
  const { hideModalHandler } = useModal();

  const returnToMainMenu = () => {
    navigate("/");
  };

  const clickHandler = (navigateTo) => {
    if (navigateTo === "/" || !navigateTo) returnToMainMenu();
    else {
      navigate(navigateTo);
    }
    hideModalHandler();
  };

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
        {props.isExitModal && (
          <Button onClick={() => clickHandler(navigateTo)}>
            {UI_TEXT.modalButtons.leaveGame}
          </Button>
        )}
        {props.closeModal && (
          <Button onClick={props.onHide}>{UI_TEXT.modalButtons.close}</Button>
        )}
        {!props.closeModal && (
          <Button onClick={() => clickHandler(navigateTo)}>
            {UI_TEXT.modalButtons.returnToMainMenu}
          </Button>
        )}
      </BSModal.Footer>
    </BSModal>
  );
};

export default Modal;
