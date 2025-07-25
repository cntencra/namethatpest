import Image from "next/image";
import {  useState, Dispatch, SetStateAction } from "react";
import { quizAnswerBox } from "../../styles/quiz.page"


const insectCommonNames = [
    ["the goodest boy"],
    ["merchant grain beetle"],
    ["oriental cockroach"],
    ["sawtooth grain beetle"]
]

const insectSpecificNames = [
    "Golden retriever",
    "Oryzaephilus mercator",
    "Blatta orientalis",
    "Oryzaephilus surinamensis"
]

const insectIds = [0,1,2,3]

const faces = [
    "/sad.svg",
    "/nuetral.svg",
    "/happy.svg"
    
]

interface QuizFormProps {
  currentInsectId: number;
  setCurrentInsectId:  Dispatch<SetStateAction<number>>;
}

export default function QuizForm ({currentInsectId, setCurrentInsectId } : QuizFormProps)  {

    const [commonFaceIndex, setCommonFaceIndex] =useState(1)
    const [specificFaceIndex, setSpecificFaceIndex] =useState(1)
    const [inputCommonName, setInputCommonName] = useState("")
    const [inputSpecificName, setInputSpecificName] = useState("")
    const [isCommonAnswerCorrect, setIsCommonAnswerCorrect] = useState(false)
    const [isSpecificAnswerCorrect, setIsSpecificAnswerCorrect] = useState(false)
    const [commonAnswerRevealed, setCommonAnswerRevealed] = useState(false)
    const [specificAnswerRevealed, setSpecificAnswerRevealed] = useState(false)

    const handleNext = () => {
        const newInsectId = getNextId()
        reset(newInsectId)
    }

    const tryAgain = () => {
        reset(currentInsectId)
    }

    const reset = (insectId : number) => {
        setInputCommonName("")
        setInputSpecificName("")
        setCommonFaceIndex(1)
        setSpecificFaceIndex(1)
        setCurrentInsectId(insectId)
        setIsCommonAnswerCorrect(false)
        setIsSpecificAnswerCorrect(false)
        setCommonAnswerRevealed(false)
        setSpecificAnswerRevealed(false)
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
        if (Math.abs(inputCommonName.length - event.target.value.length) > 2) return
        const faceIndexes = insectCommonNames[currentInsectId].map(
            (commonName) => 
                getFaceIndex(event.target.value.trim(), commonName, true)
        )
        const faceIndex = Math.max(...faceIndexes)
        if (faceIndex === 2) setIsCommonAnswerCorrect(true)
        setCommonFaceIndex(faceIndex)
        setInputCommonName(event.target.value)
    }

    const handleSpecificChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Math.abs(inputSpecificName.length - event.target.value.length) > 2) return
        const faceIndex = getFaceIndex(event.target.value.trim(), insectSpecificNames[currentInsectId], false)
       if (faceIndex === 2) setIsSpecificAnswerCorrect(true)
       setSpecificFaceIndex(faceIndex)
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


    const showCommonAnswer = () => {
        setCommonAnswerRevealed(true)
        setInputCommonName(insectCommonNames[currentInsectId][0])
    }

    const showSpecificAnswer = () => {
        setSpecificAnswerRevealed(true)
        setInputSpecificName(insectSpecificNames[currentInsectId])
    }

    const preventPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
    }
    return(
    <form 
        action={handleNext} 
        className="flex flex-col w-screen items-center"
    >
        
        <div id="common-container" className="flex flex-row max-w-screen">
            <div 
            id="common-answer-check-container"
            className="w-12 h-12 flex flex-col items-center justify-center mr-1 mt-1 relative"
            >
                    
            {commonFaceIndex === 2 ?
            <Image
                src={"/tick.svg"} alt="Correct"
                className={`${quizAnswerBox}`}
                fill
            />
            :
            commonAnswerRevealed ?
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
                onClick={showCommonAnswer}
                className={`${quizAnswerBox} bg-red-600 text-white text-xs`}
            >
                    Show Answer
            </button>
            }
            </div>
            <input
                readOnly={isCommonAnswerCorrect || commonAnswerRevealed}
                type = "text"
                onPaste={(e) => preventPaste(e)}
                value={inputCommonName}
                onChange={e => handleCommonChange(e)}
                placeholder="Common Name"
                className=" border-2 rounded  text-center py-2 mt-1"
            />
            <Image
                src={faces[commonFaceIndex]} alt="Specific Name is not correct"
                className="ml-1 w-10"
                width={40}
                height={40}
            />
        </div>


        <div 
        id="specific-container" 
        className="flex flex-row max-w-screen"
        >
            <div 
            id="specific-answer-check-container"
            className= "w-12 h-12 flex flex-col items-center justify-center mr-1 mt-1 relative"
            >
                {specificFaceIndex === 2 ?
                <Image
                    src={"/tick.svg"} alt="Correct"
                    className={quizAnswerBox}
                    width={48}
                    height={48}
                />
                :
                specificAnswerRevealed ?
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
                    onClick={showSpecificAnswer}
                    className={`${quizAnswerBox} bg-red-600 text-white text-xs`}
                >
                        Show Answer
                </button>
                }
            </div>
            <input
                readOnly={isSpecificAnswerCorrect || specificAnswerRevealed }
                name="specificAnswer"
                type = "text"
                onPaste={(e) => preventPaste(e)}
                value={inputSpecificName}
                onChange={e => handleSpecificChange(e)}
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
                type="submit"
                className="rounded border border-solid border-transparent  bg-red-600 text-white hover:bg-red-70 transition px-4 py-2 mt-10 w-w-screengit "
                >
                Next
        </button>

    </form>
    )
}  
  
 