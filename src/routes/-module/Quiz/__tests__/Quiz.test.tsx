import {
  mockFetchQuiz,
  setupMockFailedFetchQuiz,
  setupMockFetchEmptyQuiz,
  setupMockFetchQuiz,
} from '@/mock/client/fetchQuiz';
import { QuizPage } from '@/routes/quiz';
import { QuizDifficulty, QuizType } from '@/types/quiz';
import { decodeHtmlEntities } from '@/util/decodeHtmlEntities';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

const mockNavigate = vi.fn();
const mockLocalStorageSetItem = vi.fn();
const mockTriggerAttackRelease = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  ...vi.importActual('@tanstack/react-router'),
  Link: vi.fn(),
  useNavigate: vi.fn(),
  useRouter: vi.fn(),
  useSearch: vi.fn(),
  createFileRoute: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('tone', () => {
  return {
    ...vi.importActual('tone'), // Retain other Tone.js functionalities (optional)
    Synth: vi.fn().mockImplementation(() => ({
      toDestination: vi.fn().mockReturnValue({
        triggerAttackRelease: mockTriggerAttackRelease,
      }),
    })),
  };
});

const queryClient = new QueryClient({});
const QueryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('QuizPage test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    (useSearch as Mock).mockReturnValue({
      amount: 5,
      category: '',
      difficulty: QuizDifficulty.Easy,
      type: QuizType.Multiple,
    });
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: mockLocalStorageSetItem,
        getItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
    });
  });

  it('renders pages correctly if fetchQuiz success with quiz not empty', async () => {
    setupMockFetchQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    const firstQuestion = mockFetchQuiz.results[0];

    expect(screen.getByText('Loading Quiz...')).toBeDefined();
    expect(screen.getByTestId('icon-loader-spinner')).toBeDefined();
    expect(screen.getByTestId('icon-sound-disabled')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Question 1 of 5')).toBeDefined();
    });

    expect(screen.getByText(decodeHtmlEntities(firstQuestion.question))).toBeDefined();
    expect(screen.getByText(`(${decodeHtmlEntities(firstQuestion.category)})`)).toBeDefined();

    [...firstQuestion.incorrect_answers, firstQuestion.correct_answer].map((answer) => {
      expect(screen.getByText(decodeHtmlEntities(answer))).toBeDefined();
    });
  });

  it('renders pages correctly if fetchQuiz success with quiz empty', async () => {
    setupMockFetchEmptyQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText('Loading Quiz...')).toBeDefined();
    expect(screen.getByTestId('icon-loader-spinner')).toBeDefined();
    expect(screen.getByTestId('icon-sound-disabled')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(`Not Found!`)).toBeDefined();
      expect(
        screen.getByText(
          `Sorry, the quiz with the option you selected doesn't exist, please go back to the selection page`
        )
      ).toBeDefined();
    });
  });

  it('renders pages correctly if fetchQuiz error', async () => {
    setupMockFailedFetchQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText('Loading Quiz...')).toBeDefined();
    expect(screen.getByTestId('icon-loader-spinner')).toBeDefined();
    expect(screen.getByTestId('icon-sound-disabled')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(`Error!`)).toBeDefined();
      expect(
        screen.getByText(
          `Sorry, it seems like there is an error when the quiz is fetching, please kindly retry or go back to the selection page`
        )
      ).toBeDefined();
    });
  });

  it('clicking the audio button should toggle the sound', () => {
    setupMockFetchQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    expect(screen.getByTestId('icon-sound-disabled')).toBeDefined();

    const toggleSoundButton = screen.getByTestId('button-toggle-sound');

    fireEvent.click(toggleSoundButton);

    expect(screen.getByTestId('icon-sound-enabled')).toBeDefined();
    expect(mockLocalStorageSetItem).toBeCalledWith('soundEnabled', 'true');
  });

  it('should trigger the right action on select option', async () => {
    const question = mockFetchQuiz.results;

    vi.useFakeTimers({ shouldAdvanceTime: true });

    const clickAndAdvanceTime = (index: number, key: 'correct_answer' | 'incorrect_answers', playSound: boolean) => {
      const correctSound = ['C5', '8n'];
      const incorrectSound = ['C4', '8n'];

      const answer = screen.getByText(
        key === 'correct_answer' ? question[index].correct_answer : question[index].incorrect_answers[0]
      );
      fireEvent.click(answer);

      expect(
        within(answer).getByTestId(key === 'correct_answer' ? 'icon-correct-answer' : 'icon-wrong-answer')
      ).toBeDefined();

      if (playSound)
        expect(mockTriggerAttackRelease).toHaveBeenCalledWith(
          ...[...(key === 'correct_answer' ? correctSound : incorrectSound)]
        );

      vi.advanceTimersByTime(1000);
    };

    setupMockFetchQuiz();
    render(<QuizPage />, { wrapper: QueryClientWrapper });

    expect(screen.getByText('Loading Quiz...')).toBeDefined();
    expect(screen.getByTestId('icon-loader-spinner')).toBeDefined();
    expect(screen.getByTestId('icon-sound-disabled')).toBeDefined();

    const toggleSoundButton = screen.getByTestId('button-toggle-sound');

    await waitFor(() => expect(screen.getByText('Question 1 of 5')).toBeDefined());
    fireEvent.click(toggleSoundButton);
    clickAndAdvanceTime(0, 'correct_answer', true);

    await waitFor(() => expect(screen.getByText('Question 2 of 5')).toBeDefined());
    clickAndAdvanceTime(1, 'incorrect_answers', true);

    await waitFor(() => expect(screen.getByText('Question 3 of 5')).toBeDefined());
    fireEvent.click(toggleSoundButton);
    clickAndAdvanceTime(2, 'correct_answer', false);

    await waitFor(() => expect(screen.getByText('Question 4 of 5')).toBeDefined());
    clickAndAdvanceTime(3, 'incorrect_answers', true);

    // Answer fourth question
    await waitFor(() => expect(screen.getByText('Question 5 of 5')).toBeDefined());
    fireEvent.click(toggleSoundButton);
    clickAndAdvanceTime(4, 'correct_answer', false);

    // Ensure final actions or re-renders are complete
    fireEvent.click(toggleSoundButton);
    await waitFor(() => expect(screen.queryByTestId('icon-correct-answer')).toBeNull());
    expect(screen.getByText('Quiz Completed!')).toBeDefined();

    expect(mockTriggerAttackRelease).toHaveBeenCalledWith('C5', '4n');
    expect(mockTriggerAttackRelease).toHaveBeenCalledWith('E5', '4n');
    expect(mockTriggerAttackRelease).toHaveBeenCalledWith('G5', '4n');

    expect(screen.getByText('3 / 5')).toBeDefined();

    const finishButton = screen.getByTestId('button-finish-quiz');
    fireEvent.click(finishButton);

    expect(mockNavigate).toBeCalledWith({
      to: '/',
    });
  });
});
