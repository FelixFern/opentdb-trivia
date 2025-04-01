
import { mockFetchQuiz, setupMockFailedFetchQuiz, setupMockFetchEmptyQuiz, setupMockFetchQuiz } from "@/mock/client/fetchQuiz";
import { QuizPage } from "@/routes/quiz";
import { decodeHtmlEntities } from "@/util/decodeHtmlEntities";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

const mockNavigate = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  ...vi.importActual('@tanstack/react-router'),
  Link: vi.fn(),
  useNavigate: vi.fn(),
  useRouter: vi.fn(),
  useSearch: vi.fn(),
  createFileRoute: vi.fn().mockReturnValue(vi.fn()),
}))


vi.mock('tone', () => {
  return {
    ...vi.importActual('tone'), // Retain other Tone.js functionalities (optional)
    Synth: vi.fn().mockImplementation(() => ({
      toDestination: vi.fn(),
      triggerAttackRelease: vi.fn(),
    })),
  };
});

const queryClient = new QueryClient({});
const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("QuizPage test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate)
  });

  it("renders pages correctly if fetchQuiz success with quiz not empty", async () => {
    setupMockFetchQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    const firstQuestion = mockFetchQuiz.results[0];

    expect(screen.getByText("Loading Quiz...")).toBeDefined();
    expect(screen.getByTestId("icon-loader-spinner")).toBeDefined();
    expect(screen.getByTestId("icon-sound-disabled")).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Question 1 of 5')).toBeDefined();
    })

    expect(screen.getByText(decodeHtmlEntities(firstQuestion.question))).toBeDefined();
    expect(screen.getByText(`(${decodeHtmlEntities(firstQuestion.category)})`)).toBeDefined();

    [...firstQuestion.incorrect_answers, firstQuestion.correct_answer].map((answer) => {
      expect(screen.getByText(decodeHtmlEntities(answer))).toBeDefined();
    })
  });

  it("renders pages correctly if fetchQuiz success with quiz empty", async () => {
    setupMockFetchEmptyQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText("Loading Quiz...")).toBeDefined();
    expect(screen.getByTestId("icon-loader-spinner")).toBeDefined();
    expect(screen.getByTestId("icon-sound-disabled")).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(`Not Found!`)).toBeDefined();
      expect(screen.getByText(`Sorry, the quiz with the option you selected doesn't exist, please go back to the selection page`)).toBeDefined();
    })
  });

  it("renders pages correctly if fetchQuiz error", async () => {
    setupMockFailedFetchQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText("Loading Quiz...")).toBeDefined();
    expect(screen.getByTestId("icon-loader-spinner")).toBeDefined();
    expect(screen.getByTestId("icon-sound-disabled")).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(`Error!`)).toBeDefined();
      expect(screen.getByText(`Sorry, it seems like there is an error when the quiz is fetching, please kindly retry or go back to the selection page`)).toBeDefined();
    })
  });

  //! NOTE: Revisit
  // it('should trigger the right action on select option', async () => {
  //   setupMockFetchQuiz();
  //   render(<QuizPage />, { wrapper: QueryClientWrapper });

  //   const question = mockFetchQuiz.results;

  //   expect(screen.getByText("Loading Quiz...")).toBeDefined();
  //   expect(screen.getByTestId("icon-loader-spinner")).toBeDefined();
  //   expect(screen.getByTestId("icon-sound-disabled")).toBeDefined();

  //   // Wait for first question
  //   await waitFor(() => {
  //     expect(screen.getByText('Question 1 of 5')).toBeDefined();
  //   });

  //   vi.useFakeTimers();

  //   // Answer first question
  //   const firstQuestionCorrectAnswer = screen.getByText(question[0].correct_answer);
  //   fireEvent.click(firstQuestionCorrectAnswer);

  //   expect(screen.getByTestId('icon-correct-answer')).toBeDefined();

  //   // Advance timers
  //   await vi.advanceTimersByTimeAsync(1000);
  //   await waitFor(() => expect(screen.getByText('Question 2 of 5')).toBeDefined());

  //   // Answer second question
  //   const secondQuestionCorrectAnswer = screen.getByText(question[1].correct_answer);
  //   fireEvent.click(secondQuestionCorrectAnswer);

  //   expect(screen.getByTestId('icon-correct-answer')).toBeDefined();

  //   // Advance timers
  //   await vi.advanceTimersByTimeAsync(1000);
  //   await waitFor(() => expect(screen.getByText('Question 3 of 5')).toBeDefined());

  //   // Answer third question
  //   const thirdQuestionCorrectAnswer = screen.getByText(question[2].correct_answer);
  //   fireEvent.click(thirdQuestionCorrectAnswer);

  //   expect(screen.getByTestId('icon-correct-answer')).toBeDefined();

  //   // Advance timers
  //   await vi.advanceTimersByTimeAsync(1000);
  //   await waitFor(() => expect(screen.getByText('Question 4 of 5')).toBeDefined());

  //   // Answer fourth question
  //   const fourthQuestionCorrectAnswer = screen.getByText(question[3].correct_answer);
  //   fireEvent.click(fourthQuestionCorrectAnswer);

  //   expect(screen.getByTestId('icon-correct-answer')).toBeDefined();

  //   // Advance timers
  //   await vi.advanceTimersByTimeAsync(1000);
  //   await waitFor(() => expect(screen.getByText('Question 5 of 5')).toBeDefined());

  //   // Answer fifth question
  //   const fifthQuestionCorrectAnswer = screen.getByText(question[4].correct_answer);
  //   fireEvent.click(fifthQuestionCorrectAnswer);

  //   expect(screen.getByTestId('icon-correct-answer')).toBeDefined();

  //   // Final timer advance
  //   await vi.advanceTimersByTimeAsync(1000);

  //   // Ensure final actions or re-renders are complete
  //   await waitFor(() => expect(screen.queryByTestId('icon-correct-answer')).toBeNull());
  // });
})


