import React from "react";
// types
import { AnswerObj } from "../App";
// styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAns: AnswerObj | undefined;
  quesNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAns,
  quesNr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {quesNr} / {totalQuestions}
      </p>
      {/* <p dangerouslySetInnerHTML={{ __html: question }}></p> */}
      <p>{question}</p>
      <div>
        {answers.map((answer, index) => (
          <ButtonWrapper
            key={index}
            correct={userAns?.correctAns === answer}
            userClicked={userAns?.answer === answer}
          >
            <button
              disabled={userAns ? true : false}
              value={answer}
              onClick={callback}
            >
              {/* <span dangerouslySetInnerHTML={{ __html: answer }} /> */}
              <span>{answer}</span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
