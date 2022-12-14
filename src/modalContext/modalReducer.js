import { UI_TEXT } from "../services/constants";

export const initialState = {
  modalShow: false,
  modalContent: "",
  modalBackdrop: true,
  isModalClosable: true,
  modalAskAudience: {},
  isExitModal: false,
  navigatesTo: "",
  safetyNetFlag: "",
  logOutFlag: "",
};

export const ACTIONS = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
  INCORRECT_ANSWER: "INCORRECT_ANSWER",
  NO_ANSWER_SELECTED: "NO_ANSWER_SELECTED",
  CALL_FRIEND_LIFELINE: "CALL_FRIEND_LIFELINE",
  ASK_THE_AUDIENCE_LIFELINE: "ASK_THE_AUDIENCE_LIFELINE",
  TIME_EXPIRED: "TIME_EXPIRED",
  GAME_WON: "GAME_WON",
  EXIT_GAME: "EXIT_GAME",
  EXIT_FOR_AUTH: "EXIT_FOR_AUTH",
  LOG_OUT: "LOG_OUT",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_MODAL:
      return { ...state, modalShow: true };
    case ACTIONS.HIDE_MODAL:
      return { ...state, modalShow: false };
    case ACTIONS.INCORRECT_ANSWER:
      return {
        modalShow: true,
        modalContent: UI_TEXT.incorrectAnswer,
        modalBackdrop: "static",
        isModalClosable: false,
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.NO_ANSWER_SELECTED:
      return {
        modalShow: true,
        modalContent: UI_TEXT.noAnswerSelected,
        modalBackdrop: true,
        isModalClosable: true,
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.GAME_WON:
      return {
        modalShow: true,
        modalContent: UI_TEXT.gameWon,
        modalBackdrop: "static",
        isModalClosable: false,
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.CALL_FRIEND_LIFELINE:
      return {
        modalShow: true,
        modalContent:
          UI_TEXT.callFriendMessage + action.payload.correctAnswer + ".",
        modalBackdrop: true,
        isModalClosable: true,
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.ASK_THE_AUDIENCE_LIFELINE:
      return {
        modalShow: true,
        modalContent: UI_TEXT.askTheAudienceMessage,
        modalBackdrop: true,
        isModalClosable: true,
        modalAskAudience: {
          state: true,
          correctAnswer: action.payload.correctAnswer,
          answers: action.payload.answers,
        },
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.TIME_EXPIRED:
      return {
        modalShow: true,
        modalContent: UI_TEXT.timeExpired,
        modalBackdrop: "static",
        isModalClosable: false,
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.EXIT_GAME:
      return {
        modalShow: true,
        modalContent:
          action.payload.value === 0
            ? UI_TEXT.exitMessageZero
            : UI_TEXT.exitMessage + action.payload.value + ".",
        modalBackdrop: true,
        isModalClosable: true,
        isExitModal: true,
        safetyNetFlag: true,
        logOutFlag: false,
      };
    case ACTIONS.EXIT_FOR_AUTH:
      return {
        modalShow: true,
        modalContent: UI_TEXT.exitMessageAuth,
        modalBackdrop: true,
        isModalClosable: true,
        isExitModal: true,
        navigatesTo: action.payload.navigatesTo,
        safetyNetFlag: false,
        logOutFlag: false,
      };
    case ACTIONS.LOG_OUT:
      return {
        modalShow: true,
        modalContent: UI_TEXT.logOutMessage,
        modalBackdrop: true,
        isModalClosable: true,
        logOutFlag: true,
      };
    default:
      throw new Error(`No case for type ${action.type} found.`);
  }
};
