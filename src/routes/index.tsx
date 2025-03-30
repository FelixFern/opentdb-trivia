import { createFileRoute } from "@tanstack/react-router";
import QuizConfiguration from "./-module/Home/components/QuizConfiguration";
import { useHomePage } from "./-module/Home/useHomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});


function HomePage() {
  const { quizConfiguration, isSubmitButtonEnabled, handleUpdateConfiguration, handleStartQuiz } = useHomePage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-800 text-center">Open Trivia DB Quiz</h1>

        <QuizConfiguration quizConfiguration={quizConfiguration} handleUpdateConfiguration={handleUpdateConfiguration} />
        <button
          disabled={!isSubmitButtonEnabled}
          onClick={handleStartQuiz}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
  //     <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
  //       {showScore ? (
  //         <div className="space-y-4">
  //           <Trophy className="mx-auto text-yellow-500" size={80} />
  //           <h2 className="text-3xl font-bold text-indigo-700">Quiz Completed!</h2>
  //           <p className="text-xl">
  //             Your Score: <span className="font-bold text-green-600">{score}</span> / {quizQuestions.length}
  //           </p>
  //           <button
  //             onClick={resetQuiz}
  //             className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition flex items-center mx-auto space-x-2"
  //           >
  //             <RefreshCw size={20} />
  //             <span>New Quiz</span>
  //           </button>
  //         </div>
  //       ) : (
  //         <>
  //           <div className="mb-6">
  //             <div className="text-sm text-gray-500 mb-2">
  //               Question {currentQuestion + 1} of {quizQuestions.length}
  //               <span className="ml-2 text-indigo-600">
  //                 ({quizQuestions[currentQuestion].category})
  //               </span>
  //             </div>
  //             <h2 className="text-2xl font-semibold text-indigo-800">
  //               {quizQuestions[currentQuestion].question}
  //             </h2>
  //           </div>

  //           <div className="space-y-4">
  //             {quizQuestions[currentQuestion].options.map((option, index) => (
  //               <button
  //                 key={index}
  //                 onClick={() => selectedAnswer === null && handleAnswerClick(option)}
  //                 className={`w-full py-3 rounded-lg text-lg font-medium transition 
  //                   ${selectedAnswer === null
  //                     ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
  //                     : ''}
  //                   ${getAnswerStatus(option) === 'correct'
  //                     ? 'bg-green-500 text-white'
  //                     : getAnswerStatus(option) === 'incorrect'
  //                       ? 'bg-red-500 text-white'
  //                       : ''}`}
  //                 disabled={selectedAnswer !== null}
  //               >
  //                 {option}
  //                 {getAnswerStatus(option) === 'correct' && <CheckCircle className="inline ml-2" size={20} />}
  //                 {getAnswerStatus(option) === 'incorrect' && <XCircle className="inline ml-2" size={20} />}
  //               </button>
  //             ))}
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
};

