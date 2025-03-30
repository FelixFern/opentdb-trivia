import { QuizDifficulty, QuizType } from "@/types/quiz";

export const DIFFICULTY_OPTIONS = [
  {
    value: QuizDifficulty.Easy,
    label: 'Easy'
  },
  {
    value: QuizDifficulty.Medium,
    label: 'Medium'
  },
  {
    value: QuizDifficulty.Hard,
    label: 'Hard'
  },
]

export const TYPE_OPTIONS = [
  {
    value: QuizType.Multiple,
    label: 'Multiple Options'
  },
  {
    value: QuizType.TrueFalse,
    label: 'True / False'
  },
]