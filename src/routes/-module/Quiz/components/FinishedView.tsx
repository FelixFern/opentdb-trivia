import { RefreshCw, Trophy } from 'lucide-react';

type TFinishedViewProps = {
  score: number;
  totalQuestion: number;
  handleFinishQuiz: () => void;
};

const FinishedView = ({ score, totalQuestion, handleFinishQuiz }: TFinishedViewProps) => {
  return (
    <div className="space-y-4">
      <Trophy className="mx-auto text-yellow-500" size={80} />
      <h2 className="text-3xl font-bold text-indigo-700">Quiz Completed!</h2>
      <p className="text-xl">
        Your Score:{' '}
        <span className="font-bold text-green-600">
          {score} / {totalQuestion}
        </span>
      </p>
      <button
        onClick={handleFinishQuiz}
        data-testid="button-finish-quiz"
        className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition flex items-center mx-auto space-x-2"
      >
        <RefreshCw size={20} />
        <span>New Quiz</span>
      </button>
    </div>
  );
};

export default FinishedView;
