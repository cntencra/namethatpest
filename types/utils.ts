import { Insect } from "./insects"

export interface QuizFormProps {
  insect: Insect;
  handleNext: () => void
}

export interface QuizInputProps {
  isCommonInput: boolean,
  answerState: TriState,
  setAnswerState: React.Dispatch<React.SetStateAction<TriState>>,
  answer: string

}

export type TriState = "correct" | "unknown" | "wrong"