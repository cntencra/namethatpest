"use client";

import {  useState } from "react";
import QuizInput from "./QuizInput";

import { QuizFormProps, TriState } from "../../types/utils";


export default function QuizForm ({
    insect, 
    handleNext
} : QuizFormProps)  {
   
    const [commonAnswerState, setCommonAnswerState] = useState<TriState>("unknown")
    const [specificAnswerState, setSpecificAnswerState]=useState<TriState>("unknown")

    return(
    <form 
        action={handleNext} 
        className="flex flex-col w-screen items-center justify-center"
    >
        
        <QuizInput isCommonInput={true} answerState={commonAnswerState} setAnswerState={setCommonAnswerState} answer={insect.generic_name}/>
        <QuizInput isCommonInput={false} answerState={specificAnswerState} setAnswerState={setSpecificAnswerState} answer={insect.specific_name} />


        <button
                type="submit"
                className="rounded border border-solid border-transparent  bg-red-600 text-white hover:bg-red-70 transition px-4 py-2 mt-5 w-w-screengit "
                >
                Next
        </button>

    </form>
    )
}  