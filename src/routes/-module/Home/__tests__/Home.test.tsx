import { DIFFICULTY_OPTIONS, TYPE_OPTIONS } from "@/constants/options";
import { mockFetchQuizCategory, setupMockFailedFetchQuizCategory, setupMockFetchQuizCategory } from "@/mock/client/fetchQuizCategory";
import { HomePage } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

const mockNavigate = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  ...vi.importActual('@tanstack/react-router'),
  useNavigate: vi.fn(),
  createFileRoute: vi.fn().mockReturnValue(vi.fn()),
}))

const queryClient = new QueryClient({});
const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("QuizPage test", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as Mock).mockReturnValue(mockNavigate)
  });

  it("renders pages correctly if fetchQuizCategory success", async () => {
    setupMockFetchQuizCategory();
    render(<HomePage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText("Open Trivia DB Quiz")).toBeDefined();
    expect(screen.getByText("Select Difficulty")).toBeDefined();

    DIFFICULTY_OPTIONS.map((option) => {
      expect(screen.getByText(option.label)).toBeDefined()
    })

    expect(screen.getByText("Number of Questions")).toBeDefined();

    expect(screen.getByText("Select Category")).toBeDefined();
    expect(screen.getByText('Loading categories...')).toBeDefined()

    await vi.waitFor(() => {
      expect(screen.getByText('All Categories')).toBeDefined()
      mockFetchQuizCategory.trivia_categories.map((category) => {
        expect(screen.getByText(category.name)).toBeDefined();
      })
    })

    expect(screen.getByText("Select Question Type")).toBeDefined();
    TYPE_OPTIONS.map((option) => {
      expect(screen.getByText(option.label)).toBeDefined()
    })
  });

  it("renders pages correctly if fetchQuizCategory failed", async () => {
    setupMockFailedFetchQuizCategory();
    render(<HomePage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText("Open Trivia DB Quiz")).toBeDefined();
    expect(screen.getByText("Select Difficulty")).toBeDefined();

    DIFFICULTY_OPTIONS.map((option) => {
      expect(screen.getByText(option.label)).toBeDefined()
    })

    expect(screen.getByText("Number of Questions")).toBeDefined();
    expect(screen.getByText("Select Category")).toBeDefined();
    expect(screen.getByText('All Categories')).toBeDefined()

    expect(screen.getByText("Select Question Type")).toBeDefined();
    TYPE_OPTIONS.map((option) => {
      expect(screen.getByText(option.label)).toBeDefined()
    })
  });

  it("disables the Start Quiz button when configuration is not filled", () => {
    setupMockFetchQuizCategory();
    render(<HomePage />, { wrapper: QueryClientWrapper });
    expect(screen.getByRole("button", { name: /Start Quiz/i }).hasAttribute('disabled')).toBe(true);
  });

  it("enables the Start Quiz button if all configuration is filled", async () => {
    setupMockFetchQuizCategory();
    render(<HomePage />, { wrapper: QueryClientWrapper });


    await vi.waitFor(() => {
      mockFetchQuizCategory.trivia_categories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeDefined();
      });
    });

    const categorySelected = mockFetchQuizCategory.trivia_categories[1].id

    const numberInput = screen.getByPlaceholderText('Number of Questions');
    const easyButton = screen.getByText('Easy');
    const multipleOptionButton = screen.getByText('Multiple Options');
    const categorySelect = screen.getByRole('combobox');
    const startQuizButton = screen.getByRole("button", { name: "Start Quiz" })

    act(() => {
      fireEvent.change(categorySelect, { target: { value: categorySelected } });

      fireEvent.change(numberInput, { target: { value: '15' } });
      fireEvent.click(easyButton);
      fireEvent.click(multipleOptionButton);
    })

    expect(startQuizButton.hasAttribute('disabled')).toBe(false);

    fireEvent.click(startQuizButton)
    expect(mockNavigate).toBeCalledWith({
      to: '/quiz',
      search: {
        amount: 15,
        category: categorySelected.toString(),
        difficulty: 'easy',
        type: 'multiple'
      }
    })
  });
});
