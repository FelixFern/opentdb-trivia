import type { QuizDifficulty, QuizType, TQuizData } from "@/types/quiz";

export type TFetchQuizParams = {
  amount: string;
  category: string;
  type: QuizType;
  difficulty: QuizDifficulty;
};

export type TFetchQuizResponse = {
  response_code: number;
  results: TQuizData[];
};
