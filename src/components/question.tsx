"use client"
import { Question as QuestionValue } from '@/questions';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { orange, grey } from '@mui/material/colors';

export interface QuestionProps {
    questionId: number;
    question: QuestionValue;
    currentAnswer: string;
    setCurrentAnswer: (answer: string) => void; // type is a function -> takes in a string and returns void
}

export default function Question(props: QuestionProps) {
    const { questionId, question } = props;
    const { query, options } = question;

    return (
        <FormControl >
            <div className='flex justify-center text-center'>
                {/* question */}
                <FormLabel
                    sx={{
                        fontFamily: 'p22-mackinac-pro',
                        fontSize: {
                            xs: '1.5rem',
                            sm: '1.75rem',
                            md: '2rem',
                        },
                        color: grey[900],
                        '&.Mui-focused': {
                            color: grey[900], // Stop the label from changing color when focused
                        },
                    }}
                    id="demo-radio-buttons-group-label" >
                    {query}
                </FormLabel>
            </div>
            <div className='flex flex-row justify-center'>
                {/* all options */}
                <RadioGroup

                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name={questionId.toString()}
                    // value is the current answer
                    value={props.currentAnswer}

                    // take the event and set the current answer to the radio button user has chosen
                    onChange={(event) => props.setCurrentAnswer(event.target.value)}
                >
                    {/* the answer options, loop through them to display and assign radio buttons*/}
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index} value={index.toString()} control={

                                <Radio
                                    sx={{
                                        color: grey[800],
                                        '&.Mui-checked': {
                                            color: orange[600],
                                        },
                                    }}
                                />} label={option} sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontFamily: 'outfit',
                                        fontSize: {
                                            xs: '1.05rem',
                                            sm: '1.15rem',
                                            md: '1.25rem',
                                        },
                                        color: grey[800],
                                    }
                                }} />
                    ))}
                </RadioGroup>
            </div>
        </FormControl>
    );
}