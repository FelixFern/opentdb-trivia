import type { TFetchQuizParams } from "@/client/fetchQuiz/types"
import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"

export const useHomePage = () => {
  const [quizConfiguration, setQuizConfiguration] = useState<TFetchQuizParams>({
    amount: 5,
    category: undefined,
    difficulty: undefined,
    type: undefined
  })
  const navigate = useNavigate()

  const handleUpdateConfiguration = <K extends keyof TFetchQuizParams>(key: K, value: TFetchQuizParams[K]) => {
    setQuizConfiguration((conf) => ({ ...conf, [key]: value }))
  }

  const handleStartQuiz = () => {
    navigate({
      to: '/quiz',
      search: quizConfiguration
    })
  }

  const isSubmitButtonEnabled = useMemo(() =>
    Object.values(quizConfiguration).every((v) => !!v), [quizConfiguration])

  return {
    quizConfiguration,
    isSubmitButtonEnabled,
    handleUpdateConfiguration,
    handleStartQuiz
  }
}