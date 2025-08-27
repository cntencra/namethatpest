"use client";

import { useState } from "react";
import QuizForm from "../../components/quiz/QuizForm";
import Image from "next/image";
import { getInsects } from "../../lib/api"

import { useApiRequest } from "../../components/hooks/useApiRequest";


export default function Quiz() {

    const [itemId, setItemId] =useState(0)

    const {data, isLoading, error} = useApiRequest(getInsects)

    const handleNext = () => {
        setItemId(getNextId())
    }


    const getNextId = () => {
        if (data.length <= 1) return itemId
        const ids = Array.from(Array(data.length).keys())
        const filteredIds = ids.filter(id => id !== itemId);
        const randomIndex = Math.floor(Math.random()*(ids.length))
        return filteredIds[randomIndex]
    }

    if (error) return (<p>Error</p>)

    if (isLoading) return (<p>...Loading</p>)


    return (
    <div className="w-full max-w-lg flex flex-col items-center justify-center">
        <Image
            src={data[itemId].image_url}
            width={200}
            height={200}
            alt="Quiz Picture">
        
        </Image>
        <QuizForm insect = {data[itemId]} handleNext={handleNext}/>
    </div>
  );
}