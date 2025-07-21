'use client'
import Image from "next/image";
import { useEffect, useState } from "react";


export default function QuizPage() {
    const [insect, setInsects] = useState([])
    const [clicked, setClicked] = useState(false)

    const handleNext = () => {
        setClicked(true)
        alert('You clicked Next!')
    }

    const handleCommon = () => {
        setClicked(true)
        alert('You clicked Next!')
    }

    const handleSpecific = () => {
        setClicked(true)
        alert('You clicked Next!')
    }

    return (
        <main className="flex flex-col items-center">
            <h1>Identification Test</h1>
            <Image 
            src="/merchant-grain-beetle.png" alt="Image not found"
            width={180}
            height={38} 
            />
            <button
            onClick={handleNext}
            className="rounded-full border border-solid border-transparent  bg-red-600 text-white hover:bg-red-70 transition px-4 py-2"
            >
            {clicked ? 'Clicked!' : 'Click Me'}
            </button>
            <button
            onClick={handleCommon}
            className="rounded-full border border-solid border-transparent  px-4 py-2 bg-red-600 text-white hover:bg-red-70 transition"
            >
            {clicked ? 'Clicked!' : 'Click Me'}
            </button>
             <button
            onClick={handleSpecific}
            className="rounded-full border border-solid border-transparent  px-4 py-2 bg-red-600 text-white hover:bg-red-70 transition"
            >
            {clicked ? 'Clicked!' : 'Click Me'}
            </button>
            
            
        </main>
    )
}