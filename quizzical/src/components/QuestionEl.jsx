import AnswerEl from "./AnswerEl";
// import { propTypes } from "prop-types";

export default function QuestionEl({
  question,
  allAnswers,
  handleChange,
  questionID,
  selectedAnswer,
  correctAnswer,
}) {
  const allAnswersArr = allAnswers;

  const asnwersEl = allAnswersArr.map((answer) => {
    return (
      <AnswerEl
        key={answer}
        question={question}
        answer={answer}
        questionID={questionID}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
        handleChange={handleChange}
      />
    );
  });

  return (
    <div className="question">
      <h1>{question}</h1>
      <div className="answers">{asnwersEl}</div>
    </div>
  );
}

// QuestionEl.propTypes = {
//   question: propTypes.string.isRequired,
//   allAnswers: propTypes.array.isRequired,
//   handleChange: propTypes.func.isRequired,
//   questionID: propTypes.string.isRequired,
//   selectedAnswer: propTypes.string.isRequired,
//   correctAnswer: propTypes.string.isRequired,
// };
