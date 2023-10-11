import "./App.css";
import Start from "./components/StartSection";
import Questions from "./components/QuestionsSection";
import React from "react";

function App() {
  const [isQuestions, setIsQuestions] = React.useState(false);
  function startQuiz() {
    setIsQuestions((oldIsQuestions) => !oldIsQuestions);
    console.log("Quiz started");
  }
  return (
    <main>
      <div id="blob-1" className="blob"></div>
      <div id="blob-2" className="blob"></div>

      {isQuestions ? <Questions /> : <Start startQuiz={startQuiz} />}
    </main>
  );
}

export default App;
