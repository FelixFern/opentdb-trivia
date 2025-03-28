export enum QuizDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizType {
  TrueFalse = "boolean",
  Multiple = "multiple",
}

export type TQuizData = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
