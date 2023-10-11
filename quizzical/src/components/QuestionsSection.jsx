import React, { useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import QuestionEl from "./QuestionEl";
import { QuizCompletedContext } from "./QuizCompletedContext";

export default function Questions() {
  const [quizDB, setQuizDB] = React.useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = React.useState(false);
  const [isPlayAgain, setIsPlayAgain] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [numberofQuestions, setNumberOfQuestions] = React.useState(0);

  //fetch data from API and initialize data for use in the app (quizDB)
  useEffect(() => {
    async function initializeFormData() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium"
        );
        const data = await res.json();
        // console.log(data.results);

        const quizData = data.results.map((question) => {
          let allAnswers = question.incorrect_answers;

          const randomIndex = Math.floor(
            Math.random() * allAnswers.length + 1 + 1
          );

          allAnswers.splice(randomIndex, 0, question.correct_answer);

          allAnswers.forEach((answer) => decode(answer));

          return {
            id: nanoid(),
            question: decode(question.question),
            selectedAnswer: "",
            correctAnswer: decode(question.correct_answer),
            allAnswers: allAnswers,
          };
        });
        setQuizDB(quizData);
      } catch (err) {
        console.log("An error has occured retrrieving data" + err);
      }
    }

    initializeFormData();
  }, [isPlayAgain]);

  const questionsEl = quizDB
    ? quizDB.map((question) => {
        return (
          <QuestionEl
            key={question.id}
            questionID={question.id}
            question={question.question}
            allAnswers={question.allAnswers}
            selectedAnswer={question.selectedAnswer}
            correctAnswer={question.correctAnswer}
            handleChange={handleChange}
          />
        );
      })
    : "";

  function handleChange(e, questionID) {
    const value = e.target.value;
    const newFormData = quizDB.map((question) => {
      if (question.id === questionID) {
        return {
          ...question,
          selectedAnswer: value,
        };
      } else {
        return {
          ...question,
        };
      }
    });
    setQuizDB(newFormData);
  }

  function handleCheckAnswers() {
    setIsQuizCompleted(true);
    let score = 0;
    setNumberOfQuestions(quizDB.length);

    for (let question of quizDB) {
      if (question.selectedAnswer === question.correctAnswer) {
        score++;
      }
    }

    setScore(score);
  }

  function handlePlayAgain() {
    setQuizDB(null);
    setIsQuizCompleted(false);
    setIsPlayAgain((prevIsreset) => !prevIsreset);
  }
  return (
    <>
      <QuizCompletedContext.Provider value={isQuizCompleted}>
        <div className="questions-container">{questionsEl && questionsEl}</div>
        {!isQuizCompleted && quizDB && (
          <button onClick={handleCheckAnswers}>Check answers</button>
        )}
        {isQuizCompleted && (
          <>
            <h1>{`You scored ${score}/${numberofQuestions} correct answers`}</h1>
            <button onClick={handlePlayAgain}>Play again</button>
          </>
        )}
      </QuizCompletedContext.Provider>
    </>
  );
}
