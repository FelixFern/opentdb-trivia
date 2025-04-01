import * as Tone from "tone";


import { useQuizData } from "@/hooks/useQuizData";
import { QuizStatus, QuizType } from "@/types/quiz";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type TQuizStatusState = {
  isFinished: boolean,
  currentQuestion: number;
  score: number;
  selectedAnswer: string | null
}


export const useQuizPage = () => {
  const router = useRouter()
  const params = useSearch({
    from: '/quiz'
  })

  const { data: quizData, refetch: handleRefetchQuiz, isFetching: isQuizLoading, isError: isQuizError } = useQuizData({
    amount: params.amount,
    category: params.category,
    difficulty: params.difficulty,
    type: params.type as QuizType
  })

  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const [quizStatus, setQuizStatus] = useState<TQuizStatusState>({
    isFinished: false,
    currentQuestion: 0,
    score: 0,
    selectedAnswer: null
  })

  useEffect(function initiateSoundEnabled() {
    const soundEnabled = localStorage.getItem('soundEnabled')
    setIsSoundEnabled(Boolean(soundEnabled))
  }, [])

  const normalizeQuiz = useMemo(() => {
    const quizResult = quizData?.results

    return quizResult?.map((quiz) => (
      {
        ...quiz,
        answer: [quiz.correct_answer, ...quiz.incorrect_answers].sort(() => params.type === QuizType.TrueFalse ? 1 : Math.random() - 0.5)
      }
    ))
  }, [quizData?.results, isQuizLoading])


  const quizResponseStatus = quizData?.response_code
  const currentQuestion = normalizeQuiz?.[quizStatus.currentQuestion]

  const correctSound = new Tone.Synth().toDestination();
  const incorrectSound = new Tone.Synth().toDestination();
  const quizCompleteSound = new Tone.Synth().toDestination();

  const _handlePlaySound = (type: QuizStatus) => {
    if (!isSoundEnabled) return

    switch (type) {
      case QuizStatus.Correct:
        correctSound.triggerAttackRelease('C5', '8n');
        break;
      case QuizStatus.Incorrect:
        incorrectSound.triggerAttackRelease('C4', '8n');
        break;
      case QuizStatus.Complete:
        quizCompleteSound.triggerAttackRelease('C5', '4n');
        quizCompleteSound.triggerAttackRelease('E5', '4n');
        quizCompleteSound.triggerAttackRelease('G5', '4n');
        break;
      default:
        break;
    }
  };

  const handleToggleSound = () => {
    setIsSoundEnabled((p) => !p)
    localStorage.setItem('soundEnabled', String(!isSoundEnabled))
  }

  const handleFinishQuiz = () => {
    router.navigate({
      to: '/'
    })
  }

  const handleAnswerClick = (selectedOption: string) => {
    setQuizStatus((p) => ({ ...p, selectedAnswer: selectedOption }))
    if (selectedOption === currentQuestion?.correct_answer) {
      _handlePlaySound(QuizStatus.Correct);
      setQuizStatus((p) => ({ ...p, score: p.score + 1 }))
    } else {
      _handlePlaySound(QuizStatus.Incorrect);
    }

    setTimeout(() => {
      if (quizStatus.currentQuestion + 1 < (normalizeQuiz ?? []).length) {
        setQuizStatus((p) => ({ ...p, currentQuestion: p.currentQuestion + 1, selectedAnswer: null }))
      } else {
        _handlePlaySound(QuizStatus.Correct);
        setQuizStatus((p) => ({ ...p, isFinished: true, selectedAnswer: null }))
      }
    }, 1000);
  };

  const getAnswerStatus = (option: string) => {
    if (quizStatus.selectedAnswer === null) return '';

    if (option === currentQuestion?.correct_answer) {
      return QuizStatus.Correct;
    }

    return QuizStatus.Incorrect
  };

  return { params, quizResponseStatus, normalizeQuiz, currentQuestion, isQuizLoading, isQuizError, isSoundEnabled, quizStatus, handleFinishQuiz, handleToggleSound, handleAnswerClick, getAnswerStatus, handleRefetchQuiz }
}