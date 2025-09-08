"use client";

import { createContext, useState, useContext } from "react";
import { PestsOrDevs, QuizContextType } from "../types/utils";

export const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({children}: { children: React.ReactNode }) => {
    const [quizTopic, setQuizTopic] = useState< PestsOrDevs | null>(null)

    return (
        <QuizContext.Provider value={{ quizTopic, setQuizTopic }} >
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
};