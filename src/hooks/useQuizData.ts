import { fetchQuiz } from "@/client/fetchQuiz";
import type { TFetchQuizParams } from "@/client/fetchQuiz/types";
import { useQuery } from "@tanstack/react-query";

export const useQuizData = (params: TFetchQuizParams) => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      try {
        const res = await fetchQuiz(params)
        return res
      } catch (err) {
        throw new Error("Failed to fetch quiz data")
      }
    },
    refetchOnWindowFocus: false,
  });
};
