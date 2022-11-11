const UI_TEXT = {
  selectCategoryMessage: "Please select a category: ",
  incorrectAnswer: "Sorry. The answer was incorrect.",
  gameWon: "Congratulations. You won 1,000,000$!",
  callFriendMessage: "I am not sure, but I think that the correct answer is: "
};

const listLetters = ['A', 'B', 'C', 'D'];

const questionValues = [
  { value: 100, type: 'regular' },
  { value: 200, type: 'regular' },
  { value: 300, type: 'regular' },
  { value: 500, type: 'regular' },
  { value: 1000, type: 'safe' },
  { value: 2000, type: 'regular' },
  { value: 4000, type: 'regular' },
  { value: 8000, type: 'regular' },
  { value: 16000, type: 'regular' },
  { value: 32000, type: 'safe' },
  { value: 64000, type: 'regular' },
  { value: 125000, type: 'regular' },
  { value: 250000, type: 'regular' },
  { value: 500000, type: 'regular' },
  { value: 1000000, type: 'safe' }
];

export { UI_TEXT, listLetters, questionValues };
