import React, { useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import QuestionEl from "./QuestionEl";
import { QuizCompletedContext } from "./QuizCompletedContext";

export default function Questions() {
  const [formData, setFormData] = React.useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = React.useState(false);
  const [isReset, setIsReset] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [numberofQuestions, setNumberOfQuestions] = React.useState(0);

  useEffect(() => {
    async function initializeFormData() {
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

      setFormData(quizData);
    }

    initializeFormData();
  }, [isReset]);

  const questionsEl = formData
    ? formData.map((question) => {
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
    const newFormData = formData.map((question) => {
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
    setFormData(newFormData);
  }
  // console.log(isQuizCompleted);
  function handleCheckAnswers() {
    setIsQuizCompleted(true);
    let score = 0;
    setNumberOfQuestions(formData.length);

    for (let question of formData) {
      if (question.selectedAnswer === question.correctAnswer) {
        score++;
      }
    }

    setScore(score);
  }

  function handlePlayAgain() {
    setFormData(null);
    setIsQuizCompleted(false);
    setIsReset((prevIsreset) => !prevIsreset);
  }
  return (
    <>
      <QuizCompletedContext.Provider value={isQuizCompleted}>
        {/* <h1 id="title">Click to select your prefered answer</h1> */}
        <div className="questions-container">{questionsEl && questionsEl}</div>
        {!isQuizCompleted && formData && (
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
