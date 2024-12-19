"use client"
import { Button } from '@mui/material';
import { useState } from 'react';
import Question from '@/components/question';
import Retake from "../components/retake";
import { teal } from '@mui/material/colors';
import { Question as QuestionType } from '@/questions';

export interface MainFormProps {
    questions: QuestionType[];
}

export default function MainForm(props: MainFormProps) {
    const { questions } = props;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [lastAnswer, setLastAnswer] = useState<boolean>();
    const [retakeAlert, setRetakeAlert] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [showScore, setShowScore] = useState<boolean>(false);

    function nextQuestion() {
        // Check if the answer is correct
        if (currentAnswer == questions[currentQuestion].answer.toString()) {
            // If correct, increment the score, also keep last answer as true -> correct
            setLastAnswer(true);
            setScore(score + 1);
        } else {
            // If incorrect, keep last answer as false -> incorrect
            setLastAnswer(false);
        }
        //2 consecutive wrong answers to trigger the retake alert
        if (lastAnswer === false && currentAnswer != questions[currentQuestion].answer.toString()) {
            setRetakeAlert(true);
            //reset the last answer so that the alert only triggers every 2 consecutive wrong answers
            setLastAnswer(true);
        }
        setCurrentAnswer('');

        //if the current question is the last question, show the score
        if (currentQuestion === questions.length - 1) {
            setCurrentQuestion(0);
            setShowScore(true);
            return;
        }
        //else, move onto the next question
        setCurrentQuestion(currentQuestion + 1);
    }

    function refreshPage() {
        location.reload();
    }

    return (

        <div>
            {/* after quiz is done, show their score */}
            {showScore ? (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4 ">
                    <h1 className='text-2xl'>
                        You scored {score} out of {questions.length}
                    </h1>
                    {/* make page refresh to start quiz again */}
                    <Button onClick={refreshPage} variant="contained" disableElevation
                        sx={{ color: teal[50], backgroundColor: teal[400], '&:hover': { backgroundColor: teal[700] } }}
                    >Try Again</Button>
                </div>
            ) : (

                // while the quiz is ongoing, show the questions
                <>
                    <div className="flex flex-col items-center justify-center min-h-screen gap-4 mx-10 " >


                        <div className='flex flex-row flex-wrap '>
                            <Question questionId={currentQuestion} question={questions[currentQuestion]} currentAnswer={currentAnswer} setCurrentAnswer={setCurrentAnswer} />
                        </div>
                        {/* 'Next' button and make it clickable only if usere has selected an option */}
                        <Button onClick={nextQuestion} variant="contained" disabled={!currentAnswer.trim()} disableElevation
                            sx={{
                                color: teal[50],
                                backgroundColor: teal[400],
                                '&:hover': {
                                    backgroundColor: teal[700],
                                },

                            }}
                        >Next</Button>
                        {/* show user what question they're currently on */}
                        <p>{currentQuestion + 1}/{questions.length}</p>

                        {/* show retake alert if condition is met*/}
                        {retakeAlert && <Retake onClose={() => setRetakeAlert(false)} />}


                    </div>

                </>
            )
            }</div >
    )
}