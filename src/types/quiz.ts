export enum QuizDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizType {
  TrueFalse = "boolean",
  Multiple = "multiple",
}

export enum QuizStatus {
  Correct = "correct",
  Incorrect = "incorrect",
  Complete = "complete"
}

export type TQuizData = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
