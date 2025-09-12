"use client";

import { useState } from "react";
import QuizForm from "../../components/quiz/QuizForm";
import Image from "next/image";
import { getDevAnimals, getInsects } from "../../lib/api"

import { useApiRequest } from "../../components/hooks/useApiRequest";
import { useQuiz } from "../../contexts/TestType";


export default function Quiz() {

    const [itemId, setItemId] =useState(0)

    const {quizTopic, setQuizTopic} = useQuiz();

      const apiRequest = quizTopic === 'pests' ? getInsects : getDevAnimals

    const {data, isLoading, error} = useApiRequest(apiRequest)

    const handleNext = () => {
        setItemId(getNextId())
    }


    const getNextId = () => {
        if (data.length <= 1) return itemId
        const ids = Array.from(Array(data.length).keys())
        const filteredIds = ids.filter(id => id !== itemId);
        const randomIndex = Math.floor(Math.random()*(filteredIds.length))
        return filteredIds[randomIndex]
    }



    if (quizTopic === null) return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="rounded-2xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Choose a Quiz Topic</h2>
            <p>There are lots of bugs in this quiz. If you would prefer to see nice animals select the animal quiz for developers!</p>
            <div className="flex flex-col gap-3 pt-3">
              <button
                onClick={() => setQuizTopic("pests")}
                className={`px-4 py-2 rounded-lg border hover:shadow-lg dark:hover:shadow-white cursor-pointer transition `}
              >
                Pests
              </button>
              <button
                onClick={() => setQuizTopic("devs")}
                className={`px-4 py-2 rounded-lg border hover:shadow-lg dark:hover:shadow-white cursor-pointer transition `}
              >
                Developers
              </button>
            </div>
          </div>
        </div>
    )

    if (error) return (<p>Error</p>)

    if (isLoading) return (<p>...Loading</p>)


    return (
    <div className="w-full flex flex-col items-center justify-center">
        {quizTopic === null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Choose a Quiz Topic</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setQuizTopic("pests")}
                className={`px-4 py-2 rounded-lg border transition ${
                  quizTopic === "pests" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                Pests
              </button>
              <button
                onClick={() => setQuizTopic("devs")}
                className={`px-4 py-2 rounded-lg border transition ${
                  quizTopic === "devs" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                Developers
              </button>
            </div>
          </div>
        </div>
        )}
        <div className="w-[250px] h-[300px] flex flex-col items-center justify-center">
        <Image
            priority={true}
            src={data[itemId].image_url}
            width={200}
            height={300}
            style={{objectFit: "contain"}}
            alt="Quiz Picture">
        </Image>
        </div>
        <QuizForm insect = {data[itemId]} handleNext={handleNext}/>
    </div>
  );
}