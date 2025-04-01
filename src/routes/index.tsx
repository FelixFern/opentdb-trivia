import { createFileRoute } from "@tanstack/react-router";
import QuizConfiguration from "./-module/Home/components/QuizConfiguration";
import { useHomePage } from "./-module/Home/useHomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  const { quizConfiguration, isSubmitButtonEnabled, handleUpdateConfiguration, handleStartQuiz } = useHomePage()

  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-800 text-center">Open Trivia DB Quiz</h1>
      <QuizConfiguration quizConfiguration={quizConfiguration} handleUpdateConfiguration={handleUpdateConfiguration} />
      <button
        disabled={!isSubmitButtonEnabled}
        onClick={handleStartQuiz}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Quiz
      </button>
    </div>
  );
};

