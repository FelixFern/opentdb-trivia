import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"

const QuizNotFound = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl text-red-400">Not Found!</h1>
      <p>
        Sorry, the quiz with the option you selected doesn&apos;t exist, please go back to the selection page
      </p>
      <Link to="/" >
        <div className="w-full flex items-center bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition font-semibold justify-center ">
          <ArrowLeft /> Go Back
        </div>
      </Link>
    </div>
  )
}

export default QuizNotFound