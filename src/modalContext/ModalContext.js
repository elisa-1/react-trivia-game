import { createContext, useReducer, useCallback, useContext } from "react";
import { ACTIONS, initialState, reducer } from "./modalReducer";

const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(reducer, initialState);

  const askTheAudienceHandler = (answers, correctAnswer) => {
    dispatch({
      type: ACTIONS.ASK_THE_AUDIENCE_LIFELINE,
      payload: {
        answers: answers,
        correctAnswer: correctAnswer,
      },
    });
  };

  const callAFriendHandler = (correctAnswer) => {
    dispatch({
      type: ACTIONS.CALL_FRIEND_LIFELINE,
      payload: {
        correctAnswer: correctAnswer,
      },
    });
  };

  const timeExpiredHandler = useCallback(() => {
    dispatch({ type: ACTIONS.TIME_EXPIRED });
  }, []);

  const hideModalHandler = useCallback(() => {
    dispatch({ type: ACTIONS.HIDE_MODAL });
  }, []);

  const exitHandler = (value) => {
    dispatch({ type: ACTIONS.EXIT_GAME, payload: { value: value } });
  };

  const noAnswerSelectedHandler = () => {
    dispatch({ type: ACTIONS.NO_ANSWER_SELECTED });
  };

  const incorrectAnswerHandler = () => {
    dispatch({ type: ACTIONS.INCORRECT_ANSWER });
  };

  const gameWonHandler = () => {
    dispatch({ type: ACTIONS.GAME_WON });
  };

  const exitForAuthHandler = (navigatesTo) => {
    if (localStorage.getItem("gameStarted") === "1") {
      dispatch({
        type: ACTIONS.EXIT_FOR_AUTH,
        payload: { navigatesTo: navigatesTo },
      });
    }
  };

  const value = {
    modalShow: modalState.modalShow,
    modalContent: modalState.modalContent,
    modalBackdrop: modalState.modalBackdrop,
    modalAdditionalClass: modalState.modalAdditionalClass,
    isModalClosable: modalState.isModalClosable,
    modalAskAudience: modalState.modalAskAudience,
    isExitModal: modalState.isExitModal,
    safetyNetFlag: modalState.safetyNetFlag,
    navigatesTo: modalState.navigatesTo,
    askTheAudienceHandler,
    callAFriendHandler,
    timeExpiredHandler,
    hideModalHandler,
    exitHandler,
    noAnswerSelectedHandler,
    incorrectAnswerHandler,
    gameWonHandler,
    exitForAuthHandler,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within modalContext");
  }

  return context;
};

export default useModal;
