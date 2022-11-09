import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import Form from "../components/Form/Form";
import styles from "./Game.module.css";

const Game = () => {
  const storedQuestions = localStorage.getItem("questions");
  const storedQuestionNo = localStorage.getItem("questionNo");

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
          setQuestions(res.data);
          localStorage.setItem("questions", JSON.stringify(res.data));
        } catch (err) {
          console.log(err.message);
        }
      };
      getData();
    }
  }, [category, storedQuestions]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await getQuestions(category);
  //     try {
  //       if (res.status === 200) {
  //         setQuestions((prev) => {
  //           if (!prev) {
  //             return [...res.data];
  //           } else if (prev === JSON.parse(storedQuestions)) {
  //             return prev;
  //           }
  //         });
  //       }
  //     } catch (err) {
  //       console.log("Something went wrong.", err.message);
  //     }
  //   };
  //   getData();
  // }, [category, storedQuestions]);

  useEffect(() => {
    if (questions) {
      let answers = [
        ...questions[questionNo].incorrectAnswers,
        `${questions[questionNo].correctAnswer} ***`,
      ];
      randomSort(answers);
      setCurrentQuestionAnswers(answers);
      localStorage.setItem("questionNo", questionNo);
    }
  }, [questions, questionNo]);

  const randomSort = (values) => {
    return values.sort(() => Math.random() - 0.5);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (questionNo === questions.length - 1) return;
    setQuestionNo((prevNo) => prevNo + 1);
  };

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game"]}`}
    >
      {questions && (
        <>
          <Form
            data={currentQuestionAnswers}
            label={`${questionNo}. ${questions[questionNo].question}`}
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
