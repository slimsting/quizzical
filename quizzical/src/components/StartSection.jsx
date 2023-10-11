// import { propTypes } from "prop-types";
export default function StartSection({ startQuiz }) {
  return (
    <main>
      <h1>Quizzical</h1>
      <p>Solve simple questions </p>
      <button onClick={startQuiz}>Start Quiz</button>
    </main>
  );
}

// Start.propTypes = {
//   startQuiz: propTypes.func.isrequired,
// };
