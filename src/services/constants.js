const UI_TEXT = {
  selectCategoryMessage: "Please select a category: ",
  incorrectAnswer: "Sorry. The answer was incorrect. Game over.",
  noAnswerSelected: "Please select an answer.",
  gameWon: "Congratulations. You won 1,000,000$!",
  callFriendMessage: "I am not sure, but I think that the correct answer is: ",
  askTheAudienceMessage: "See below what our audience thinks: ",
  timeExpired: "Sorry. Your time expired. Game over.",
  exitButtonMessage: "GET $",
  exitMessageZero:
    "Are you sure you want to leave the game? If you leave now, you will not get any money.",
  exitMessage:
    "Are you sure you want to leave the game? If you leave now, you only take $",
  exitMessageAuth:
    "Are you sure you want to leave the game? You will lose this game's progress.",
};

const listLetters = ["A", "B", "C", "D"];

const questionValues = [
  { value: 100, type: "regular" },
  { value: 200, type: "regular" },
  { value: 300, type: "regular" },
  { value: 500, type: "regular" },
  { value: 1000, type: "safe" },
  { value: 2000, type: "regular" },
  { value: 4000, type: "regular" },
  { value: 8000, type: "regular" },
  { value: 16000, type: "regular" },
  { value: 32000, type: "safe" },
  { value: 64000, type: "regular" },
  { value: 125000, type: "regular" },
  { value: 250000, type: "regular" },
  { value: 500000, type: "regular" },
  { value: 1000000, type: "safe" },
];

export { UI_TEXT, listLetters, questionValues };
