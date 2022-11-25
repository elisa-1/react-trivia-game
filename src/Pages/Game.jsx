import { useState, useEffect } from "react";
import useModal from "../modalContext/ModalContext";
import { UserAuth } from "../authContext/AuthContext";
import { useParams } from "react-router-dom";
import { getQuestions } from "../services/api";
import { listLetters } from "../services/constants";
import { randomSort, sortQuestionsByDifficulty } from "../services/utils";
import Form from "../components/Form/Form";
import Modal from "../components/UI/Modal";
import Scoreboard from "../components/Scoreboard/Scoreboard";
import LifelineBar from "../components/Lifeline/LifelineBar";
import Timer from "../components/Timer/Timer";
import Exit from "../components/Exit/Exit";
import Spinner from "../components/UI/Spinner";
import styles from "./Game.module.css";

const Game = () => {
  const { getUserDoc, user } = UserAuth();

  const {
    modalShow,
    modalContent,
    modalBackdrop,
    modalAdditionalClass,
    isModalClosable,
    modalAskAudience,
    isExitModal,
    askTheAudienceHandler,
    callAFriendHandler,
    timeExpiredHandler,
    hideModalHandler,
    exitHandler,
    noAnswerSelectedHandler,
    incorrectAnswerHandler,
    gameWonHandler,
  } = useModal();

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

  useEffect(() => {
    if (questions) {
      getUserDoc(user);
    }
  }, [questions, getUserDoc, user]);

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
    askTheAudienceHandler(
      currentQuestionAnswers,
      questions[questionNo].correctAnswer
    );
  };

  const handleCallAFriend = () => {
    setTimerIsPaused(true);
    callAFriendHandler(questions[questionNo].correctAnswer);
  };

  const handleHideModal = () => {
    hideModalHandler();
    setTimerIsPaused(false);
  };

  const handleExit = (value) => {
    exitHandler(value);
    setTimerIsPaused(true);
  };

  const checkAnswer = () => {
    const currentCorrectAnswer = questions[questionNo].correctAnswer;
    const isCorrectAnswerSelected =
      selectedAnswer.includes(currentCorrectAnswer);

    if (!selectedAnswer) {
      noAnswerSelectedHandler();
      setTimerIsPaused(true);
    }
    if (selectedAnswer && !isCorrectAnswerSelected) {
      incorrectAnswerHandler();
      setTimerIsPaused(true);
    }
    if (isCorrectAnswerSelected && questionNo < questions.length - 1) {
      setQuestionNo((prevNo) => prevNo + 1);
      localStorage.removeItem("currentAnswers");
      setTimerIsReset(true);
    }
    if (isCorrectAnswerSelected && questionNo === questions.length - 1) {
      gameWonHandler();
    }
    setSelectedAnswer("");
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
        show={modalShow}
        backdrop={modalBackdrop}
        onHide={handleHideModal}
        content={modalContent}
        closeModal={isModalClosable}
        isExitModal={isExitModal}
        modalAdditionalClass={modalAdditionalClass}
        modalAskAudience={modalAskAudience}
      />
      {questions ? (
        <>
          <Exit questionNo={questionNo} handleExit={handleExit} />
          <Timer
            timerValue={20}
            handleTimeExpired={timeExpiredHandler}
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
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Game;
