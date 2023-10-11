import React from "react";
import { QuizCompletedContext } from "./QuizCompletedContext";
// import { propTypes } from "prop-types";

export default function AnswerEl({
  question,
  answer,
  handleChange,
  questionID,
  selectedAnswer,
  correctAnswer,
}) {
  const isQuizCompleted = React.useContext(QuizCompletedContext);

  let dynamicStyle = null;
  if (isQuizCompleted) {
    if (answer === selectedAnswer) {
      dynamicStyle = {
        backgroundColor: "#F8BCBC",
        scale: "",
        border: "none",
        pointerEvents: "none",
      };
    }
    if (answer === correctAnswer) {
      dynamicStyle = {
        backgroundColor: "#94D7A2",
        scale: "",
        border: "none",
        pointerEvents: "none",
      };
    }

    if (answer !== selectedAnswer && answer != correctAnswer) {
      dynamicStyle = { opacity: "0.5", pointerEvents: "none" };
    }
  } else {
    dynamicStyle =
      answer === selectedAnswer
        ? { backgroundColor: "#D6DBF5", scale: "", border: "none" }
        : {};
  }

  return (
    <label className="answer-el" style={dynamicStyle}>
      <input
        type="radio"
        name={question}
        value={answer}
        className="radio"
        onChange={(e) => {
          handleChange(e, questionID);
        }}
      />
      {answer}
    </label>
  );
}
// AnswerEl.propTypes = {
//   question: propTypes.string.isRequired,
//   allAnswers: propTypes.array.isRequired,
//   handleChange: propTypes.func.isRequired,
//   questionID: propTypes.string.isRequired,
//   selectedAnswer: propTypes.string.isRequired,
//   correctAnswer: propTypes.string.isRequired,
//   answer: propTypes.string.isRequired,
// };
