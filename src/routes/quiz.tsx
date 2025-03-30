import type { TFetchQuizParams } from '@/client/fetchQuiz/types'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quiz')({
  component: QuizPage,
  validateSearch: (search: TFetchQuizParams) => search,
})

function QuizPage() {
  return <div>Hello "/quiz"!</div>
}
