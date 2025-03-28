import { FETCH_QUIZ } from "@/constants/api";

export const fetchQuiz = async ({}) => {
  try {
    const res = await fetch(FETCH_QUIZ, {
      method: "GET",
    });

    const json = await res.json();

    return json;
  } catch (err) {}
};
