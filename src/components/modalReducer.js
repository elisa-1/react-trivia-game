import { UI_TEXT } from "../services/constants";

export const ACTIONS = {
  SHOW_MODAL: "show-modal",
  HIDE_MODAL: "hide-modal",
  INCORRECT_ANSWER: "incorrect-answer",
  NO_ANSWER_SELECTED: "no-answer-selected",
  CALL_FRIEND_LIFELINE: "call-friend-lifeline",
  ASK_THE_AUDIENCE_LIFELINE: "ask-the-audience-lifeline",
  TIME_EXPIRED: "time-expired",
  GAME_WON: "game-won",
  EXIT_GAME: "exit-game",
  EXIT_FOR_AUTH: "exit-for-auth",
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
        modalAdditionalClass: "game-over",
      };
    case ACTIONS.NO_ANSWER_SELECTED:
      return {
        modalShow: true,
        modalContent: UI_TEXT.noAnswerSelected,
        modalBackdrop: true,
        isModalClosable: true,
      };
    case ACTIONS.GAME_WON:
      return {
        modalShow: true,
        modalContent: UI_TEXT.gameWon,
        modalBackdrop: "static",
        isModalClosable: false,
        modalAdditionalClass: "game-won",
      };
    case ACTIONS.CALL_FRIEND_LIFELINE:
      return {
        modalShow: true,
        modalContent: UI_TEXT.callFriendMessage + action.payload.correctAnswer,
        modalBackdrop: true,
        isModalClosable: true,
        modalAdditionalClass: "call-friend",
      };
    case ACTIONS.ASK_THE_AUDIENCE_LIFELINE:
      return {
        modalShow: true,
        modalContent: UI_TEXT.askTheAudienceMessage,
        modalBackdrop: true,
        isModalClosable: true,
        modalAdditionalClass: "ask-audience",
        modalAskAudience: {
          state: true,
          correctAnswer: action.payload.correctAnswer,
          answers: action.payload.answers,
        },
      };
    case ACTIONS.TIME_EXPIRED:
      return {
        modalShow: true,
        modalContent: UI_TEXT.timeExpired,
        modalBackdrop: "static",
        isModalClosable: false,
        modalAdditionalClass: "game-over",
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
        modalAdditionalClass: "ask-audience",
        isExitModal: true,
      };
    case ACTIONS.EXIT_FOR_AUTH:
      return {
        modalShow: true,
        modalContent: UI_TEXT.exitMessageAuth,
        modalBackdrop: true,
        isModalClosable: true,
        modalAdditionalClass: "ask-audience",
        isExitModal: true,
      };
    default:
      return state;
  }
};
