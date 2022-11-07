import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-trivia-api.com/api",
  headers: { Accept: "application/json" },
});

const getCategories = () => {
  return instance.get("/categories");
};

const getQuestions = (category) => {
  if (category === "all") {
    return instance.get(`/questions?limit=15`);
  } else {
    return instance.get(`/questions?categories=${category}&limit=15`);
  }
};

export { getCategories, getQuestions };
