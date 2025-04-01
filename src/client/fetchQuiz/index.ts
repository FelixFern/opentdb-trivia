import { FETCH_QUIZ } from "@/constants/api";
import type { TFetchQuizParams, TFetchQuizResponse } from "./types";

export const fetchQuiz = async (params: TFetchQuizParams) => {
  try {
    const normalizedParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ ...params, amount: (params.amount ?? "").toString() }).filter(
          ([, v]) => !!v
        )
      )
    ).toString();

    const res = await fetch(`${FETCH_QUIZ}?${normalizedParams}`, {
      method: "GET",
    });

    const json = await res.json();

    return json as TFetchQuizResponse;
  } catch {
    throw new Error("Error: failed to fetch quiz");
  }
};
