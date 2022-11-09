import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import Form from "../components/Form/Form";
import styles from "./Game.module.css";

const Game = () => {
  const storedQuestions = localStorage.getItem("questions");
  const storedQuestionNo = localStorage.getItem("questionNo");
  const storedCurrentAnswers = localStorage.getItem("currentAnswers");

  const [questions, setQuestions] = useState();
  const [questionNo, setQuestionNo] = useState(
    storedQuestionNo ? +storedQuestionNo : 0
  );
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    if (storedQuestions && storedQuestions !== "undefined") {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      const getData = async () => {
        const res = await getQuestions(category);
        try {
          setQuestions((prev) => {
            if (!prev) {
              return res.data;
            } else {
              return prev;
            }
          });
          if (!localStorage.getItem("questions")) {
            localStorage.setItem("questions", JSON.stringify(res.data));
          }
        } catch (err) {
          console.log(err.message);
        }
      };
      getData();
    }
  }, [category, storedQuestions]);

  useEffect(() => {
    if (questions) {
      if (storedCurrentAnswers) {
        const storedCurrentAnswersArr = JSON.parse(storedCurrentAnswers);
        setCurrentQuestionAnswers(storedCurrentAnswersArr);
      } else {
        let answers = randomSort([
          ...questions[questionNo].incorrectAnswers,
          `${questions[questionNo].correctAnswer} ***`,
        ]);
        setCurrentQuestionAnswers(answers);
        localStorage.setItem("currentAnswers", JSON.stringify(answers));
      }
      localStorage.setItem("questionNo", questionNo);
    }
  }, [questions, questionNo, storedCurrentAnswers]);

  const randomSort = (values) => {
    return values.sort(() => Math.random() - 0.5);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (questionNo === questions.length - 1) return;
    setQuestionNo((prevNo) => prevNo + 1);
    localStorage.removeItem("currentAnswers");
  };

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game"]}`}
    >
      {questions && (
        <>
          <Form
            data={currentQuestionAnswers}
            label={`${questionNo + 1}. ${questions[questionNo].question}`}
            type={"questions"}
            onSubmit={handleSubmit}
          />
          <div></div>
        </>
      )}
    </main>
  );
};

export default Game;
