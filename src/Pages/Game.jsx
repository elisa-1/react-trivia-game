import { useState, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import { randomSort } from "../services/utils";
import { ACTIONS, reducer } from "../components/modalReducer";
import Form from "../components/Form/Form";
import Modal from "../components/UI/Modal";
import Scoreboard from "../components/Scoreboard/Scoreboard";
import LifelineBar from "../components/Lifeline/LifelineBar";
import Timer from "../components/Timer/Timer";
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
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [modalState, dispatch] = useReducer(reducer, {
    modalShow: false,
    modalContent: "",
    modalBackdrop: true,
    modalAdditionalClass: "",
  });

  const { category } = useParams();
  const navigate = useNavigate();

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

  const handleSelectedAnswer = (value) => {
    if (selectedAnswer !== value) setSelectedAnswer(value);
  };

  const checkAnswer = () => {
    const currentCorrectAnswer = questions[questionNo].correctAnswer;
    if (!selectedAnswer.includes(currentCorrectAnswer)) {
      dispatch({ type: ACTIONS.INCORRECT_ANSWER });
      setIsGameOver(true);
    }
    if (
      selectedAnswer.includes(currentCorrectAnswer) &&
      questionNo < questions.length - 1
    ) {
      setQuestionNo((prevNo) => prevNo + 1);
      localStorage.removeItem("currentAnswers");
    }
    if (
      selectedAnswer.includes(currentCorrectAnswer) &&
      questionNo === questions.length - 1
    ) {
      dispatch({ type: ACTIONS.GAME_WON });
      setIsGameOver(true);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    checkAnswer();
  };

  return (
    <main
      className={`d-flex flex-column justify-content-center align-items-center gap-3 ${styles["main-game"]}`}
    >
      <Modal
        show={modalState.modalShow}
        backdrop={modalState.modalBackdrop}
        onHide={() => dispatch({ type: ACTIONS.HIDE_MODAL })}
        content={modalState.modalContent}
        closeModal={!isGameOver}
        modalAdditionalClass={modalState.modalAdditionalClass}
        goToMainMenu={() => {
          navigate("/");
        }}
      />
      <Timer />
      <LifelineBar
        className=""
        lifelineClassName=""
        onCallFriendLifeline={() =>
          dispatch({
            type: ACTIONS.CALL_FRIEND_LIFELINE,
            payload: { correctAnswer: questions[questionNo].correctAnswer },
          })
        }
      />
      {questions && (
        <section
          className={`d-flex align-items-center justify-content-center ${styles["game-section"]}`}
        >
          <Form
            data={currentQuestionAnswers}
            label={`${questionNo + 1}. ${questions[questionNo].question}`}
            type={"questions"}
            onGetSelectedOption={handleSelectedAnswer}
            onSubmit={handleSubmit}
          />
          <Scoreboard questionNo={questionNo} />
        </section>
      )}
    </main>
  );
};

export default Game;
