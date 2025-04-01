import type { TFetchQuizParams } from "@/client/fetchQuiz/types"
import { DIFFICULTY_OPTIONS, TYPE_OPTIONS } from "@/constants/options"
import { useQuizCategoryData } from "@/hooks/useQuizCategoryData"
import { Loader } from "lucide-react"

type TQuizConfigurationProps = {
  quizConfiguration: TFetchQuizParams
  handleUpdateConfiguration: <K extends keyof TFetchQuizParams>(key: K, value: TFetchQuizParams[K]) => void
}

const QuizConfiguration = ({ quizConfiguration, handleUpdateConfiguration }: TQuizConfigurationProps) => {
  const { data: categoryData, isLoading: isLoadingCategoryData } = useQuizCategoryData()

  return (
    <>
      <div>
        <label className="block text-indigo-700 font-semibold mb-2">
          Number of Questions
        </label>
        <input
          type="number"
          min="1"
          value={quizConfiguration.amount}
          onChange={(e) => handleUpdateConfiguration('amount', Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-indigo-700 font-semibold mb-2">
          Select Difficulty
        </label>
        <div className="flex flex-wrap gap-2 flex-col">
          {DIFFICULTY_OPTIONS.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => handleUpdateConfiguration('difficulty', value)}
              className={`px-4 py-2 rounded-full text-sm transition ${quizConfiguration.difficulty === value
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-indigo-700 font-semibold mb-2">
          Select Category
        </label>
        {isLoadingCategoryData ? (
          <div className="flex items-center space-x-2 h-11 px-4 py-2 border rounded-lg bg-gray-50">
            <Loader className="animate-spin text-indigo-600" size={18} />
            <span className="text-gray-500">Loading categories...</span>
          </div>
        ) : (
          <select
            value={quizConfiguration.category}
            onChange={(e) => handleUpdateConfiguration('category', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white pr-10"
          >
            <option value="all">All Categories</option>
            {categoryData?.trivia_categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <label className="block text-indigo-700 font-semibold mb-2">
          Select Question Type
        </label>
        <div className="flex flex-wrap gap-2 flex-col">
          {TYPE_OPTIONS.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => handleUpdateConfiguration('type', value)}
              className={`px-4 py-2 rounded-full text-sm transition ${quizConfiguration.type === value
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

    </>
  )
}

export default QuizConfiguration