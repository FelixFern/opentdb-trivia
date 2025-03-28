import { FETCH_QUIZ } from "@/constants/api";
import type { TFetchQuizCategoryResponse } from "../fetchQuizCategory/types";
import type { TFetchQuizParams } from "./types";

export const fetchQuiz = async (params: TFetchQuizParams) => {
  try {
    const normalizedParams = encodeURIComponent(
      new URLSearchParams(params).toString()
    );
    const res = await fetch(`${FETCH_QUIZ}?${normalizedParams}`, {
      method: "GET",
    });

    const json = await res.json();

    return json as TFetchQuizCategoryResponse;
  } catch (err) {
    throw new Error("Error: failed to fetch quiz");
  }
};
