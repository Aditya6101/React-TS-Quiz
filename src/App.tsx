import React, { useState } from "react";
import { fetchQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// Types
import { QuestionState, Difficulty } from "./API";
// styles
import { GlobalStyle } from "./App.styles";
import { Wrapper } from "./App.styles";

export type AnswerObj = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAns: string;
};

const Total_Questions = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setQuizFinished(false);
    const newQuestions = await fetchQuestions(Total_Questions, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizFinished) {
      //  User's answer
      const answer = e.currentTarget.value;
      // Check is answer correct
      const isCorrect = questions[number].correct_answer === answer;
      // Add score is answer is correct
      if (isCorrect) setScore((prev) => prev + 1);
      // Save answer in the array for user answers
      const ansObj: AnswerObj = {
        question: questions[number].question,
        answer,
        isCorrect,
        correctAns: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, ansObj]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === Total_Questions) {
      setQuizFinished(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <h1>React Quiz</h1>
          {quizFinished || userAnswers.length === Total_Questions ? (
            <button className="start" onClick={startQuiz}>
              Start
            </button>
          ) : null}
          {!quizFinished ? <p>Score: {score} </p> : null}
          {loading && <p>Loading Questions</p>}

          {!loading && !quizFinished && (
            <QuestionCard
              quesNr={number + 1}
              totalQuestions={Total_Questions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAns={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!quizFinished &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== Total_Questions - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </Wrapper>
      </div>
    </>
  );
};

export default App;
