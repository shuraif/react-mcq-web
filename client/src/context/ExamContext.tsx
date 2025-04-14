import { createContext, useContext, useState, ReactNode } from "react";
import { ExamAttempt, Question, UserAnswer } from "@shared/schema";

interface ExamContextType {
  currentExamAttempt: ExamAttempt | null;
  setCurrentExamAttempt: (attempt: ExamAttempt | null) => void;
  currentQuestion: Question | null;
  setCurrentQuestion: (question: Question | null) => void;
  userAnswers: Record<string, string>;
  setUserAnswers: (answers: Record<string, string>) => void;
  addAnswer: (questionId: string, optionId: string) => void;
  resetExamState: () => void;
  examTimer: number;
  setExamTimer: (seconds: number) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider = ({ children }: { children: ReactNode }) => {
  const [currentExamAttempt, setCurrentExamAttempt] = useState<ExamAttempt | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [examTimer, setExamTimer] = useState<number>(0);

  const addAnswer = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const resetExamState = () => {
    setCurrentExamAttempt(null);
    setCurrentQuestion(null);
    setUserAnswers({});
    setExamTimer(0);
  };

  const value = {
    currentExamAttempt,
    setCurrentExamAttempt,
    currentQuestion,
    setCurrentQuestion,
    userAnswers,
    setUserAnswers,
    addAnswer,
    resetExamState,
    examTimer,
    setExamTimer,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
};
