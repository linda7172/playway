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
        if (currentAnswer == questions[currentQuestion].answer.toString()) {
            setLastAnswer(true);
            setScore(score + 1);
        } else {
            setLastAnswer(false);
        }

        if (lastAnswer === false && currentAnswer != questions[currentQuestion].answer.toString()) {
            setRetakeAlert(true);
            setLastAnswer(true);
        }
        setCurrentAnswer('');

        if (currentQuestion === questions.length - 1) {
            setCurrentQuestion(0);
            setShowScore(true);
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
    }

    function refreshPage() {
        location.reload();
    }
    return (

        <div>

            {showScore ? (
                <div className="flex flex-col items-center justify-center min-h-screen gap-4 ">
                    <h1 className='text-2xl'>
                        You scored {score} out of {questions.length}
                    </h1>
                    <Button onClick={refreshPage} variant="contained" disableElevation
                        sx={{ color: teal[50], backgroundColor: teal[400], '&:hover': { backgroundColor: teal[700] } }}
                    >Try Again</Button>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center min-h-screen gap-4 mx-10 " >


                        <div className='flex flex-row flex-wrap '>
                            <Question questionId={currentQuestion} question={questions[currentQuestion]} currentAnswer={currentAnswer} setCurrentAnswer={setCurrentAnswer} />
                        </div>
                        <Button onClick={nextQuestion} variant="contained" disabled={!currentAnswer.trim()} disableElevation
                            sx={{
                                color: teal[50],
                                backgroundColor: teal[400],
                                '&:hover': {
                                    backgroundColor: teal[700],
                                },

                            }}
                        >Next</Button>
                        <p>{currentQuestion + 1}/{questions.length}</p>
                        {retakeAlert && <Retake onClose={() => setRetakeAlert(false)} />}


                    </div>

                </>
            )
            }</div >
    )
}