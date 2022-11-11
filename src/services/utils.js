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

export { randomSort, sortQuestionsByDifficulty };
