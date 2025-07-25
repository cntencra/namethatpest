'use client'
import Image from "next/image";
import {  useState } from "react";
import QuizForm from "../components/QuizForm";

const insectImgUrls = [
    "/the-goodest-boy.jpg",
    "/merchant-grain-beetle.png",
    "/oriental-cockroach.png",
    "/saw-toothed-grain-beetle.png"
]


export default function QuizPage() {

    const [currentInsectId, setCurrentInsectId] = useState(0)

    return (
        <main className="flex flex-col items-center px-4 pb-5 min-h-screen">

            <div id="grid-container"
            className="grid grid-rows-[0.1fr_0.8fr_0.1fr] items-center justify-items-center min-h-screen"
            >
                <Image
                    className="w-auto mt-5 dark:invert"
                    priority
                    src='/ntp-title.png'
                    alt="Insect not found"
                    width={200}
                    height={20}
                />
                <Image
                    className="w-auto"
                    priority
                    src={insectImgUrls[currentInsectId]} 
                    alt="Insect not found"
                    width={100}
                    height={300}
                />
                <QuizForm setCurrentInsectId={setCurrentInsectId} currentInsectId={currentInsectId}/>
            </div>
        </main>
    )
}