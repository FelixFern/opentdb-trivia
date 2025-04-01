import type { TFetchQuizParams } from "@/client/fetchQuiz/types";
import { ResponseStatus } from "@/types/common";
import { createFileRoute } from "@tanstack/react-router";
import { Loader, Volume2, VolumeX } from "lucide-react";
import FinishedView from "./-module/Quiz/components/FinishedView";
import { QuestionView } from "./-module/Quiz/components/QuestionView";
import QuizError from "./-module/Quiz/components/QuizError";
import QuizNotFound from "./-module/Quiz/components/QuizNotFound";
import { useQuizPage } from "./-module/Quiz/useQuizPage";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  validateSearch: (search: TFetchQuizParams) => search
});

function QuizPage() {
  const hooks = useQuizPage();
  const {
    quizStatus,
    quizResponseStatus,
    normalizeQuiz,
    isSoundEnabled,
    isQuizLoading,
    isQuizError,
    handleFinishQuiz,
    handleToggleSound,
    handleRefetchQuiz
  } = hooks;

  return (
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleToggleSound}
          className="p-2 rounded-full hover:bg-indigo-100 transition"
        >
          {isSoundEnabled ? (
            <Volume2 className="text-indigo-600" />
          ) : (
            <VolumeX className="text-gray-400" />
          )}
        </button>
      </div>
      {isQuizLoading ? (
        <div className="flex items-center gap-2">
          <Loader className="animate-spin text-indigo-600" size={18} />
          <p>Loading Quiz...</p>
        </div>
      ) : (
        <>
          {(quizResponseStatus === ResponseStatus.NotFound || normalizeQuiz?.length === 0) && (
            <QuizNotFound />
          )}
          {(quizResponseStatus === ResponseStatus.Error || isQuizError) && (
            <QuizError handleRefetchQuiz={handleRefetchQuiz} />
          )}
          {quizResponseStatus === ResponseStatus.Success && (
            <>
              {quizStatus.isFinished ? (
                <FinishedView
                  score={quizStatus?.score}
                  totalQuestion={normalizeQuiz?.length ?? 0}
                  handleFinishQuiz={handleFinishQuiz}
                />
              ) : (
                <QuestionView {...hooks} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
