import { UI_TEXT } from "../services/constants";

export const ACTIONS = {
  SHOW_MODAL: "show-modal",
  HIDE_MODAL: "hide-modal",
  INCORRECT_ANSWER: "incorrect-answer",
  CALL_FRIEND_LIFELINE: "call-friend-lifeline",
  GAME_WON: "game-won",
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
        modalAdditionalClass: "incorrect-answer",
      };
    case ACTIONS.GAME_WON:
      return {
        modalShow: true,
        modalContent: UI_TEXT.gameWon,
        modalBackdrop: "static",
        modalAdditionalClass: "game-won",
      };
    case ACTIONS.CALL_FRIEND_LIFELINE:
      return {
        modalShow: true,
        modalContent: UI_TEXT.callFriendMessage + action.payload.correctAnswer,
        modalBackdrop: true,
        modalAdditionalClass: "call-friend",
      };
    default:
      return state;
  }
};
