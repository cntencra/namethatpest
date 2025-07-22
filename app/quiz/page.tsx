'use client'
import Image from "next/image";
import {  useState } from "react";

const insectImgUrls = [
    "/merchant-grain-beetle.png",
    "/oriental-cockroach.png",
    "/saw-toothed-grain-beetle.png"
]

const insectIds = [0,1,2]

const faces = [
    "/happy.svg",
    "/nuetral.svg",
    "/sad.svg"
]

export default function QuizPage() {
    const [genericName, setGenericName] = useState("")
    const [specificName, setSpecificName] = useState("")
    const [currentID, setCurrentId] = useState(0)
    const [insectImgUrl, setInsectImgUrl] = useState(insectImgUrls[0])
    const [clicked, setClicked] = useState(false)

    const handleGenericChange = () => {

    }

    const handleSpecificChange = () => {

    }

    const handleNext = () => {
        const oldId = currentID
        console.log(oldId, 'old id')
        const indexOfOldId = insectIds.indexOf(oldId)
        console.log(indexOfOldId, 'index of old id')
        //remove current insectID from array
        insectIds.splice(indexOfOldId,1)
        console.log(insectIds, 'insectIds')
        // get a random index for the current insectId array
        const randomIndex = Math.round(Math.random()*(insectIds.length - 1))
        console.log(randomIndex, 'randomIndex')
        // set new Img Url with new insectID
        setInsectImgUrl(insectImgUrls[insectIds[randomIndex]])
        console.log(insectImgUrl)
        // set new currentID
        setCurrentId(() => insectIds[randomIndex])
        console.log(currentID, 'new current_id \n')
        // replace old currentId in insectId array
        insectIds.splice(indexOfOldId,-1,oldId)
        console.log(insectIds, 'insectIDs replaced')
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
        <main className="flex flex-col items-center px-4 pb-5 min-h-screen">
            <div id="grid-container"
            className="grid grid-rows-[0.05fr_0.8fr_0.05fr_0.05fr_0.05fr] items-center justify-items-center min-h-screen"
            >
                <Image
                    className="w-auto mt-5"
                    priority
                    src='/ntp-title.png'
                    alt="Insect not found"
                    width={200}
                    height={20}
                />
                <Image
                    className="w-auto"
                    priority
                    src={insectImgUrl} 
                    alt="Insect not found"
                    width={120}
                    height={40}
                />
                <div id="specific-container" className="flex flex-row max-w-screen">
                
                    <button
                            onClick={handleCommon}
                            className="rounded border border-solid border-transparent bg-red-600 text-white text-xs px-1 mr-1"
                            >
                            Show Answer
                    </button>
                    <input
                        type = "text"
                        value={genericName}
                        onChange={handleGenericChange}
                        placeholder="Generic Name"
                        className="border-2 rounded  text-center py-2"
                    />
                    <img
                        src="/happy.svg" alt="Specific Name is not correct"
                        className="ml-1"
                        width={40}
                        style={{height:"auto"}}
                    />
                </div>
                <div id="specific-container" className="flex flex-row max-w-screen">
                    <button
                        onClick={handleNext}
                        className="rounded border border-solid border-transparent  bg-red-600 text-white text-xs px-1 mr-1 mt-1"
                        >
                        Show Answer
                    </button>
                    <input
                        type = "text"
                        value={specificName}
                        onChange={handleSpecificChange}
                        placeholder="Specific Name"
                        className="border-2 rounded  text-center py-2 mt-1"
                    />
                    <img
                        src={faces[1]} alt="Specific Name is not correct"
                        className="ml-1"
                        width={40}
                        style={{height:"auto"}}
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