import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import Form from "../components/Form/Form";
import styles from "./Game.module.css";

const Game = () => {
  const [questions, setQuestions] = useState();
  const [questionNo, setQuestionNo] = useState(0);
  const { category } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await getQuestions(category);
      try {
        if (res.status === 200) {
          setQuestions((prev) => {
            if (!prev) {
              return [...res.data];
            } else {
              return prev;
            }
          });
        }
      } catch (err) {
        console.log("Something went wrong.", err.message);
      }
    };
    getData();
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (questionNo === questions.length - 1) return;
    setQuestionNo((prevNo) => prevNo + 1);
  };

  console.log(questions?.length);

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game"]}`}
    >
      {questions && (
        <>
          <Form
            data={[
              ...questions[questionNo].incorrectAnswers,
              questions[questionNo].correctAnswer,
            ]}
            label={questions[questionNo].question}
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
