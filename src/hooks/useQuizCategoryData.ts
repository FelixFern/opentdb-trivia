import { fetchQuizCategory } from "@/client/fetchQuizCategory";
import { useQuery } from "@tanstack/react-query";

export const useQuizCategoryData = () => {
  return useQuery({
    queryKey: ["quiz", "category"],
    queryFn: fetchQuizCategory,
  });
};
