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
      dynamicStyle = { backgroundColor: "#F8BCBC" };
    }
    if (answer === correctAnswer) {
      dynamicStyle = { backgroundColor: "#94D7A2" };
    }
  } else {
    dynamicStyle =
      answer === selectedAnswer ? { backgroundColor: "#D6DBF5" } : {};
  }

  return (
    <label className="option" style={dynamicStyle}>
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
