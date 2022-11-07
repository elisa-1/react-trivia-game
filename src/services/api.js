import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-trivia-api.com/api",
  headers: { Accept: "application/json" },
});

const getCategories = () => {
  return instance.get("/categories");
};

export { getCategories };
