import { QuizStatus } from "@/types/quiz";
import { decodeHtmlEntities } from '@/util/decodeHtmlEntities';
import { CheckCircle, XCircle } from "lucide-react";
import type { useQuizPage } from "../useQuizPage";

export const QuestionView = ({ quizStatus, normalizeQuiz, currentQuestion, handleAnswerClick, getAnswerStatus, }: ReturnType<typeof useQuizPage>) => {
  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col items-center text-sm text-gray-500 mb-2">
          Question {quizStatus.currentQuestion + 1} of {normalizeQuiz?.length}
          <span className="text-indigo-600">
            ({decodeHtmlEntities(currentQuestion?.category ?? '')})
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-indigo-800">
          {decodeHtmlEntities(currentQuestion?.question ?? "")}
        </h2>
      </div>

      <div className="space-y-4">
        {currentQuestion?.answer.map((option, index) => (
          <button
            key={index}
            onClick={() => quizStatus.selectedAnswer === null && handleAnswerClick(option)}
            className={`w-full py-3 rounded-lg text-lg font-medium transition
                  ${quizStatus.selectedAnswer === null
                ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
                : ''}
                  ${getAnswerStatus(option) === QuizStatus.Correct
                ? 'bg-green-500 text-white'
                : getAnswerStatus(option) === QuizStatus.Incorrect
                  ? 'bg-red-500 text-white'
                  : ''}`}
            disabled={quizStatus.selectedAnswer !== null}
          >
            {decodeHtmlEntities(option)}
            {getAnswerStatus(option) === QuizStatus.Correct && <CheckCircle className="inline ml-2" size={20} data-testid="icon-correct-answer" />}
            {getAnswerStatus(option) === QuizStatus.Incorrect && <XCircle className="inline ml-2" size={20} data-testid="icon-wrong-answer" />}
          </button>
        ))}
      </div>
    </>
  )
}