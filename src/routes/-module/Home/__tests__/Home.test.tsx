import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "../../../index";
import { useHomePage } from "../useHomePage";

vi.mock("../useHomePage", () => ({
  useHomePage: vi.fn(),
}));

const queryClient = new QueryClient({});
const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const setup = (overrides = {}) => {
  const defaultValues = {
    quizConfiguration: {},
    isSubmitButtonEnabled: false,
    handleUpdateConfiguration: vi.fn(),
    handleStartQuiz: vi.fn(),
  };
  const mockValues = { ...defaultValues, ...overrides };
  useHomePage.mockReturnValue(mockValues);
  return mockValues;
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the quiz title", () => {
    setup();
    render(<HomePage />, { wrapper: QueryClientWrapper });
    expect(screen.getByText("Open Trivia DB Quiz")).toBeDefined();
  });

  it("renders the QuizConfiguration component", () => {
    setup();
    render(<HomePage />, { wrapper: QueryClientWrapper });
    expect(screen.getByRole("button", { name: /Start Quiz/i })).toBeDefined();
  });

  it("disables the Start Quiz button when isSubmitButtonEnabled is false", () => {
    setup({ isSubmitButtonEnabled: false });
    render(<HomePage />, { wrapper: QueryClientWrapper });
    expect(screen.getByRole("button", { name: /Start Quiz/i }).hasAttribute('disabled')).toBe(true);
  });

  it("enables the Start Quiz button when isSubmitButtonEnabled is true", () => {
    setup({ isSubmitButtonEnabled: true });
    render(<HomePage />, { wrapper: QueryClientWrapper });
    expect(screen.getByRole("button", { name: /Start Quiz/i }).hasAttribute('disabled')).toBe(false);
  });

  it("calls handleStartQuiz when the Start Quiz button is clicked", async () => {
    const { handleStartQuiz } = setup({ isSubmitButtonEnabled: true });
    render(<HomePage />, { wrapper: QueryClientWrapper });
    await userEvent.click(screen.getByRole("button", { name: /Start Quiz/i }));
    expect(handleStartQuiz).toHaveBeenCalled();
  });

  // it("calls handleUpdateConfiguration when quiz configuration changes", async () => {
  //   const { handleUpdateConfiguration } = setup();
  //   render(<HomePage />, { wrapper: QueryClientWrapper });
  //   // Simulate some configuration change
  //   await userEvent.type(screen.getByLabelText("Number of Questions"), "10");
  //   expect(handleUpdateConfiguration).toHaveBeenCalled();
  // });
});
