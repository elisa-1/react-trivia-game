const randomSort = (values) => {
  return values.sort(() => Math.random() - 0.5);
};

const sortQuestionsByDifficulty = (questions) => {
  const difficulties = ["easy", "medium", "hard"];
  return questions.sort(
    (a, b) =>
      difficulties.indexOf(a.difficulty) - difficulties.indexOf(b.difficulty)
  );
};

const getValueWon = (currentValue, questionValues) => {
  const safeQuestionValues = questionValues.filter(
    (question) => question.type === "safe"
  );

  for (let i = 0; i < safeQuestionValues.length; i++) {
    if (currentValue < safeQuestionValues[0].value) return 0;
    if (currentValue < safeQuestionValues[i].value)
      return safeQuestionValues[i - 1].value.toLocaleString();
    if (
      currentValue === safeQuestionValues[safeQuestionValues.length - 1].value
    )
      return safeQuestionValues[
        safeQuestionValues.length - 1
      ].value.toLocaleString();
  }
};

export { randomSort, sortQuestionsByDifficulty, getValueWon };
