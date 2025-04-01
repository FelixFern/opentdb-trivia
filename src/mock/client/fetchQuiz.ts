import { vi, type Mock } from "vitest";

export const setupMockFetchQuiz = () => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve(mockFetchQuiz)
      },
    })
  ) as Mock;
};

export const setupMockFetchEmptyQuiz = () => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve({
          "response_code": 0,
          results: []
        })
      },
    })
  ) as Mock;
}

export const setupMockFailedFetchQuiz = () => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve({
          "response_code": 5,
          results: []
        })
      },
    })
  ) as Mock;
};

export const mockFetchQuiz = {
  "response_code": 0,
  "results": [
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Music",
      "question": "What is the name of Rivers Cuomo&#039;s wife?",
      "correct_answer": "Kyoko Ito",
      "incorrect_answers": [
        "Yoko Ono",
        "Kyary Pamyu Pamyu",
        "LiSA"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "General Knowledge",
      "question": "Which of the following is the IATA code for Manchester Airport?",
      "correct_answer": "MAN",
      "incorrect_answers": [
        "EGLL",
        "LHR",
        "EGCC"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "What is the protagonist&#039;s title given by the demons in DOOM (2016)?",
      "correct_answer": "Doom Slayer",
      "incorrect_answers": [
        "Doom Guy",
        "Doom Marine",
        "Doom Reaper"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "General Knowledge",
      "question": "Who is considered the &quot;Father of Modern Philosophy&quot;?",
      "correct_answer": "Ren&eacute; Descartes",
      "incorrect_answers": [
        "Plato",
        "Albert Einstein",
        "Antoine Lavoiser"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "What is the name of a popular franchise that includes placing blocks down and surviving in an open world? ",
      "correct_answer": "Minecraft",
      "incorrect_answers": [
        "Unturned",
        "Roblox",
        "Grand Theft Auto V"
      ]
    }
  ]
}