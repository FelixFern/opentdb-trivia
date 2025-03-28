import { FETCH_QUIZ_CATEGORY } from "@/constants/api";
import type { TFetchQuizCategoryResponse } from "./types";

export const fetchQuizCategory = async () => {
  try {
    const res = await fetch(FETCH_QUIZ_CATEGORY, {
      method: "GET",
    });

    const json = await res.json();

    return json as TFetchQuizCategoryResponse;
  } catch (err) {
    throw new Error("Error: failed to fetch quiz category");
  }
};
