import { FETCH_QUIZ_CATEGORY } from "@/constants/api";

export const fetchQuizCategory = async () => {
  try {
    const res = await fetch(FETCH_QUIZ_CATEGORY, {
      method: "GET",
    });

    const json = await res.json();

    return json;
  } catch (err) {}
};
