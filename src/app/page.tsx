"use client";
import React, { useState } from "react";
import Retake from "../components/retake";

type Option = {
  option: string;
  isCorrect: boolean;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { option: "Paris", isCorrect: true },
      { option: "Berlin", isCorrect: false },
      { option: "Madrid", isCorrect: false },
      { option: "London", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "What is the capital of Germany?",
    options: [
      { option: "Paris", isCorrect: false },
      { option: "Berlin", isCorrect: true },
      { option: "Madrid", isCorrect: false },
      { option: "London", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "What is the capital of Spain?",
    options: [
      { option: "Paris", isCorrect: false },
      { option: "Berlin", isCorrect: false },
      { option: "Madrid", isCorrect: true },
      { option: "London", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "The capital of Italy is London.",
    options: [
      { option: "True", isCorrect: false },
      { option: "False", isCorrect: true }
    ]
  },
  {
    id: 5,
    question: "What is the capital of England?",
    options: [
      { option: "Paris", isCorrect: false },
      { option: "Berlin", isCorrect: false },
      { option: "Madrid", isCorrect: false },
      { option: "London", isCorrect: true }
    ]
  },
  {
    id: 5,
    question: "What is the capital of England?",
    options: [
      { option: "Paris", isCorrect: false },
      { option: "Berlin", isCorrect: false },
      { option: "Madrid", isCorrect: false },
      { option: "London", isCorrect: true }
    ]
  },
  {
    id: 5,
    question: "What is the capital of England?",
    options: [
      { option: "Paris", isCorrect: false },
      { option: "Berlin", isCorrect: false },
      { option: "Madrid", isCorrect: false },
      { option: "London", isCorrect: true }
    ]
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [previousIncorrect, setPreviousIncorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [retakeAlert, setRetakeAlert] = useState<boolean>(false);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    // If correct answer, increase score by 1, if not, set previousIncorrect to true
    setRetakeAlert(false);
    if (isCorrect) {
      setScore(score + 1);
      setPreviousIncorrect(false); // reset the incorrect flag if the answer is correct
    } else {
      setPreviousIncorrect(true);
    }

    if (previousIncorrect && !isCorrect) {
      // Show the Retake component when two incorrect answers are selected
      setRetakeAlert(true);
      setPreviousIncorrect(false);
    }

    const nextQuestion = currentQuestion + 1;


    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);

    } else {
      setShowScore(true);
    }

  };

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            {/* onClose function takes on the value of retake */}
            {retakeAlert && <Retake onClose={() => setRetakeAlert(false)} />}

            <div className='question-text'>{questions[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option.isCorrect)}>
                {option.option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
