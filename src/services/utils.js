const randomSort = (values) => {
  return values.sort(() => Math.random() - 0.5);
};

export { randomSort };