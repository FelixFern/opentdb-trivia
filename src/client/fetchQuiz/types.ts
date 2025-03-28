import type { QuizDifficulty, QuizType } from "@/types/quiz";

export type TFetchQuizParams = {
  amount: number;
  category: string;
  type: QuizType;
  difficulty: QuizDifficulty;
};

export type TFetchQuizResponse = {};
