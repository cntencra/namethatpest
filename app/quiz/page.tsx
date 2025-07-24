'use client'
import Image from "next/image";
import {  useState } from "react";

const insectImgUrls = [
    "/merchant-grain-beetle.png",
    "/oriental-cockroach.png",
    "/saw-toothed-grain-beetle.png"
]

const insectCommonNames = [
    ["merchant grain beetle"],
    ["oriental cockroach"],
    ["sawtooth grain beetle"]
]

const insectSpecificNames = [
    "Oryzaephilus mercator",
    "Blatta orientalis",
    "Oryzaephilus surinamensis"
]

const insectIds = [0,1,2]

const faces = [
    "/sad.svg",
    "/nuetral.svg",
    "/happy.svg"
    
]

export default function QuizPage() {

    const [currentInsectId, setCurrentInsectId] = useState(0)
    const [commonFaceIndex, setCommonFaceIndex] =useState(1)
    const [specificFaceIndex, setSpecificFaceIndex] =useState(1)
    const [inputCommonName, setInputCommonName] = useState("")
    const [inputSpecificName, setInputSpecificName] = useState("")
   

    const handleNext = () => {
        const newId = getNextId()
        setInputCommonName("")
        setInputSpecificName("")

        setCurrentInsectId(newId)
    }

    const getNextId = () => {
        const oldId = currentInsectId
        const insectIdsCopy = [...insectIds]
        const indexOfOldId = insectIdsCopy.indexOf(oldId)
        insectIdsCopy.splice(indexOfOldId,1)
        const randomIndex = Math.floor(Math.random()*(insectIdsCopy.length))
        return insectIdsCopy[randomIndex]
    }

    const handleCommonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const faceIds = insectCommonNames[currentInsectId].map(
            (commonName) => 
                getFaceIndex(event.target.value, commonName, true)
        )
        const faceId = Math.max(...faceIds)
        setCommonFaceIndex(faceId)
        setInputCommonName(event.target.value)
    }

    const handleSpecificChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const facesIndex = getFaceIndex(event.target.value, insectSpecificNames[currentInsectId], false)
       setSpecificFaceIndex(facesIndex)
       setInputSpecificName(event.target.value)
    }

    const getFaceIndex = (input: string, insectName: string, isCommonName: boolean) => {
        if(input === "") return 1
        if(fullMatch(input, insectName, isCommonName)) return 2
        if(partialMatch(input, insectName)) return 1
        return 0
    }

    const fullMatch = (input:string, insectName:string, isCommonName: boolean) => {
        if(insectName === input) return true
        if(isCommonName && insectName.toLowerCase() === input.toLowerCase()) return true
        return false
    }

    const partialMatch = (input:string, insectName:string, ) => {
        if(insectName.toLowerCase().includes(input.toLowerCase())) return true
        return false
    }


    const handleCommonAnswer = () => {
        if(commonFaceIndex == 2) return
    }

    const handleSpecificAnswer = () => {
        if(commonFaceIndex == 2) return
    }

    return (
        <main className="flex flex-col items-center px-4 pb-5 min-h-screen">

            <div id="grid-container"
            className="grid grid-rows-[0.05fr_0.8fr_0.05fr_0.05fr_0.05fr] items-center justify-items-center min-h-screen"
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
                <div id="common-container" className="flex flex-row max-w-screen">
                
                    <button
                            onClick={handleCommonAnswer}
                            className="rounded border border-solid border-transparent bg-red-600 text-white text-xs px-1 mr-1"
                            >
                            Show Answer
                    </button>
                    <input
                        type = "text"
                        value={inputCommonName}
                        onChange={handleCommonChange}
                        placeholder="Common Name"
                        className="border-2 rounded  text-center py-2"
                    />
                    <Image
                        src={faces[commonFaceIndex]} alt="Specific Name is not correct"
                        className="ml-1 w-10"
                        width={10}
                        height={10}
                    />
                </div>
                <div id="specific-container" className="flex flex-row max-w-screen">
                    <button
                        onClick={handleSpecificAnswer}
                        className="rounded border border-solid border-transparent  bg-red-600 text-white text-xs px-1 mr-1 mt-1"
                        >
                        Show Answer
                    </button>
                    <input
                        type = "text"
                        value={inputSpecificName}
                        onChange={handleSpecificChange}
                        placeholder="Specific Name"
                        className="border-2 rounded  text-center py-2 mt-1"
                    />
                    <Image
                        src={faces[specificFaceIndex]} alt="Specific Name is not correct"
                        className="ml-1 w-10"
                        width={10}
                        height={10}
                    />
                </div>
                <button
                        onClick={handleNext}
                        className="rounded border border-solid border-transparent  bg-red-600 text-white hover:bg-red-70 transition px-4 py-2 mt-10 w-1/2"
                        >
                        Next
                </button>
            </div>
        </main>
    )
}