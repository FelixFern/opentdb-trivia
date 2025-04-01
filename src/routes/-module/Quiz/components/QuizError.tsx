import { Link } from "@tanstack/react-router"
import { ArrowLeft, RefreshCcw } from "lucide-react"

type TQuizError = {
  handleRefetchQuiz: () => void
}

const QuizError = ({ handleRefetchQuiz }: TQuizError) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl text-red-400">Error!</h1>
      <p>
        Sorry, it seems like there is an error when the quiz is fetching, please kindly retry or go back to the selection page
      </p>
      <div className="flex gap-2 items-center justify-center">
        <button onClick={handleRefetchQuiz} className="w-full rounded-full flex items-center border-blue-500 border-2 text-blue-500 py-2 hover:opacity-80 transition font-semibold justify-center gap-2 cursor-pointer"><RefreshCcw /> Retry</button>
        <Link to="/" className="w-full flex items-center bg-blue-500  border-blue-500 border-2 text-white py-2 rounded-full hover:bg-blue-600 transition font-semibold justify-center gap-2">
          <ArrowLeft /> Go Back
        </Link>
      </div>

    </div>)
}

export default QuizError