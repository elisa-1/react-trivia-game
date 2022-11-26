import { useNavigate } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import useModal from "../../modalContext/ModalContext";
import { UserAuth } from "../../authContext/AuthContext";
import { UI_TEXT } from "../../services/constants";
import { db } from "../../firebase/firebaseConfig";
import { Modal as BSModal } from "react-bootstrap";
import AskAudienceBars from "../Lifeline/AskAudienceBars";
import Button from "./Button";
import styles from "./Modal.module.css";

const Modal = (props) => {
  const navigate = useNavigate();
  const { user, logout, setUserDocId, setUserData, userDocId } = UserAuth();
  const { hideModalHandler, navigatesTo, safetyNetFlag, logOutFlag } =
    useModal();

  const returnToMainMenu = () => {
    navigate("/");
  };

  const updateGamesEndedDoc = async () => {
    const userDoc = doc(db, "stats", userDocId);
    await updateDoc(userDoc, {
      gamesEnded: increment(1),
    });
  };

  const clickHandler = () => {
    if (navigatesTo === "/" || !navigatesTo) {
      if (user && safetyNetFlag) {
        updateGamesEndedDoc();
      }
      returnToMainMenu();
    } else {
      navigate(navigatesTo);
    }
    hideModalHandler();
  };

  const logOutHandler = async () => {
    try {
      await logout();
      setUserDocId("");
      setUserData({});
      navigate("/");
    } catch (err) {
      console.log(err.message);
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
          <Button onClick={() => clickHandler()}>
            {UI_TEXT.modalButtons.leaveGame}
          </Button>
        )}
        {props.closeModal && (
          <Button onClick={props.onHide}>{UI_TEXT.modalButtons.close}</Button>
        )}
        {!props.closeModal && (
          <Button onClick={() => clickHandler()}>
            {UI_TEXT.modalButtons.returnToMainMenu}
          </Button>
        )}
        {logOutFlag && (
          <Button onClick={logOutHandler}>{UI_TEXT.modalButtons.logOut}</Button>
        )}
      </BSModal.Footer>
    </BSModal>
  );
};

export default Modal;
