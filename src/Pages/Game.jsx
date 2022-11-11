import { useState, useEffect, useReducer, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import { listLetters } from "../services/constants";
import { randomSort, sortQuestionsByDifficulty } from "../services/utils";
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
  const [timerIsReset, setTimerIsReset] = useState(false);
  const [timerIsPaused, setTimerIsPaused] = useState(false);
  const [modalState, dispatch] = useReducer(reducer, {
    modalShow: false,
    modalContent: "",
    modalBackdrop: true,
    modalAdditionalClass: "",
    isModalClosable: true,
    modalAskAudience: {},
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
              return sortQuestionsByDifficulty(res.data);
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
        const finalAnswers = answers.map(
          (answer, index) => (answer = `${listLetters[index]}. ${answer}`)
        );
        setCurrentQuestionAnswers(finalAnswers);
        localStorage.setItem("currentAnswers", JSON.stringify(finalAnswers));
      }
      localStorage.setItem("questionNo", questionNo);
    }
    setTimerIsReset(false);
  }, [questions, questionNo, storedCurrentAnswers]);

  const handleSelectedAnswer = (value) => {
    if (selectedAnswer !== value) setSelectedAnswer(value);
  };

  const handleFiftyFifty = () => {
    let copiedAnswers = [...currentQuestionAnswers];
    let arrIndexIncorrectAnswers = [];

    for (let answer of [...questions[questionNo].incorrectAnswers]) {
      arrIndexIncorrectAnswers.push(
        copiedAnswers.findIndex((elem) => elem.includes(answer))
      );
    }
    randomSort(arrIndexIncorrectAnswers);
    copiedAnswers[arrIndexIncorrectAnswers[0]] = "";
    copiedAnswers[arrIndexIncorrectAnswers[1]] = "";
    if (!copiedAnswers.includes(selectedAnswer)) setSelectedAnswer("");
    setCurrentQuestionAnswers(copiedAnswers);
    localStorage.setItem("currentAnswers", JSON.stringify(copiedAnswers));
  };

  const handleAskTheAudience = () => {
    setTimerIsPaused(true);
    dispatch({
      type: ACTIONS.ASK_THE_AUDIENCE_LIFELINE,
      payload: {
        answers: currentQuestionAnswers,
        correctAnswer: questions[questionNo].correctAnswer,
      },
    });
  };

  const handleCallAFriend = () => {
    setTimerIsPaused(true);
    dispatch({
      type: ACTIONS.CALL_FRIEND_LIFELINE,
      payload: { correctAnswer: questions[questionNo].correctAnswer },
    });
  };

  const handleTimeExpired = useCallback(() => {
    dispatch({ type: ACTIONS.TIME_EXPIRED });
  }, []);

  const handleHideModal = () => {
    dispatch({ type: ACTIONS.HIDE_MODAL });
    setTimerIsPaused(false);
  };

  const checkAnswer = () => {
    const currentCorrectAnswer = questions[questionNo].correctAnswer;
    const isCorrectAnswerSelected =
      selectedAnswer.includes(currentCorrectAnswer);

    if (!selectedAnswer) {
      dispatch({ type: ACTIONS.NO_ANSWER_SELECTED });
    }
    if (selectedAnswer && !isCorrectAnswerSelected) {
      dispatch({ type: ACTIONS.INCORRECT_ANSWER });
    }
    if (isCorrectAnswerSelected && questionNo < questions.length - 1) {
      setQuestionNo((prevNo) => prevNo + 1);
      localStorage.removeItem("currentAnswers");
      setTimerIsReset(true);
    }
    if (isCorrectAnswerSelected && questionNo === questions.length - 1) {
      dispatch({ type: ACTIONS.GAME_WON });
    }
    setSelectedAnswer("");
  };

  console.log(selectedAnswer);

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
        onHide={handleHideModal}
        content={modalState.modalContent}
        closeModal={modalState.isModalClosable}
        modalAdditionalClass={modalState.modalAdditionalClass}
        modalAskAudience={modalState.modalAskAudience}
        goToMainMenu={() => {
          navigate("/");
        }}
      />
      {questions && (
        <>
          <Timer
            timerValue={20}
            handleTimeExpired={handleTimeExpired}
            timerIsReset={timerIsReset}
            timerIsPaused={timerIsPaused}
          />
          <LifelineBar
            onCallFriendLifeline={handleCallAFriend}
            onFiftyFifty={handleFiftyFifty}
            onAskAudienceLifeline={handleAskTheAudience}
          />
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
        </>
      )}
    </main>
  );
};

export default Game;
