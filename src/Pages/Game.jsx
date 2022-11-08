import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import Form from "../components/Form/Form";
import styles from "./Game.module.css";

const Game = () => {
  const [questions, setQuestions] = useState();
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

  console.log(questions);

  return (
    <main
      className={`d-flex justify-content-center align-items-center ${styles["main-game"]}`}
    >
      {questions && (
        <Form
          data={[...questions[0].incorrectAnswers, questions[0].correctAnswer]}
          label={questions[0].question}
          type={"questions"}
          onGetSelectedCategory={null}
          onSubmit={null}
        />
      )}
    </main>
  );
};

export default Game;
