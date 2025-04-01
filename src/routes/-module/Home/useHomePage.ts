import type { TFetchQuizParams } from "@/client/fetchQuiz/types"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"

export type TQuizConfigurationState = {
  name?: string
} & TFetchQuizParams

const optionalFields: (keyof TQuizConfigurationState)[] = ['name', 'category']

export const useHomePage = () => {
  const [quizConfiguration, setQuizConfiguration] = useState<TQuizConfigurationState>({
    name: undefined,
    amount: 5,
    category: undefined,
    difficulty: undefined,
    type: undefined
  })
  const navigate = useNavigate()

  const handleUpdateConfiguration = <K extends keyof TQuizConfigurationState>(key: K, value: TQuizConfigurationState[K]) => {
    setQuizConfiguration((conf) => ({ ...conf, [key]: value }))
  }

  const handleStartQuiz = () => {
    navigate({
      to: '/quiz',
      search: quizConfiguration
    })
  }

  const isSubmitButtonEnabled = useMemo(() =>
    Object.entries(quizConfiguration).filter(([key, _]) => !(optionalFields as string[]).includes(key)).every(([_, val]) => !!val), [quizConfiguration])

  return {
    quizConfiguration,
    isSubmitButtonEnabled,
    handleUpdateConfiguration,
    handleStartQuiz
  }
}