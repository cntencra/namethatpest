"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { quizAnswerBox } from "../../styles/quiz.page"

import { QuizInputProps } from "../../types/utils";



export default function QuizInput({
  isCommonInput,
  answerState,
  setAnswerState,
  answer
}: QuizInputProps) {

  const faces = [
    "/sad.svg",
    "/neutral.svg",
    "/happy.svg"
  ]

  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    setAnswerRevealed(false)
    setAnswerState("unknown")
    setInput("");
  }, [answer]);

  const tryAgain = () => {
    setAnswerRevealed(false)
    setAnswerState("unknown")
    setInput("")
  }

  const showAnswer = () => {
    setAnswerRevealed(true)
    setAnswerState("wrong")
    setInput(answer)
  }

  const preventPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    getAnswerState(event.target.value)
    setInput(event.target.value)
   
  }


  const getAnswerState = (input: string) => {
    if(input === "") {
      setAnswerState("unknown")
      return
    } 
    if(fullMatch(input)) {
      setAnswerState("correct")
      return
    }
    if(partialMatch(input)) {
      setAnswerState("unknown")
      return
    }
    setAnswerState("wrong")
    return
  }

  const fullMatch = (input:string) => {
    if(answer === input) return true
    if(isCommonInput && answer.toLowerCase() === input.toLowerCase()) return true
    return false
  }

  const partialMatch = (input:string ) => {
    if(answer.toLowerCase().includes(input.toLowerCase())) return true
    return false
  }


  return (
  <div id="container" className="flex flex-row max-w-screen mt-1">
    <div 
    id="answer-check-container"
    className="w-12 h-12 flex flex-col items-center justify-center mr-1 mt-1 relative"
    >
            
    {answerState === "correct" ?
    <Image
        src={"/tick.svg"} alt="Correct"
        className={`${quizAnswerBox}`}
        fill
    />
    :
    answerRevealed ?
        <button
        type="button"
        onClick={tryAgain}
        className={`${quizAnswerBox} bg-blue-600 text-white text-xs`}
    >
            Try Again
    </button>
    :
    <button
        type="button"
        onClick={showAnswer}
        className={`${quizAnswerBox} bg-red-600 text-white text-xs`}
    >
            Show Answer
    </button>
    }
    </div>
    <input
        readOnly={answerState === "correct" || answerRevealed}
        type = "text"
        onPaste={(e) => preventPaste(e)}
        value={input}
        onChange={e => handleInputChange(e)}
        placeholder={isCommonInput? "Common Name" : "Specific Name"}
        className=" border-2 rounded  text-center py-2 mt-1"
    />
    <Image
        src={faces[answerState === "correct"? 2 : answerState === "unknown"? 1 : 0]} alt="Smiley Face"
        className="ml-1 w-10"
        width={40}
        height={40}
    />
  </div>
    
  );
}