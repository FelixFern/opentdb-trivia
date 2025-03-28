import { fetchQuiz } from "@/client/fetchQuiz";
import type { TFetchQuizParams } from "@/client/fetchQuiz/types";
import { useQuery } from "@tanstack/react-query";

export const useQuizData = (params: TFetchQuizParams) => {
  return useQuery({
    queryKey: ["quiz", params],
    staleTime: 0,
    queryFn: async () => await fetchQuiz(params),
  });
};
