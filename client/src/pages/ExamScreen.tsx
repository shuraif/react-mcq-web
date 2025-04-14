import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useExam } from "@/context/ExamContext";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import { apiRequest } from "@/lib/queryClient";

const ExamScreen = () => {
  const [, params] = useRoute('/exam/:id');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const { setCurrentExamAttempt } = useExam();
  
  const examId = parseInt(params?.id || '0');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [startTime] = useState<Date>(new Date());
  const [attemptId, setAttemptId] = useState<number | null>(null);
  
  // Get exam details
  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: [`/api/exams/${examId}`],
    enabled: !!examId,
  });
  
  // Initialize exam attempt
  const createAttemptMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/exam-attempts', data);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setAttemptId(data.id);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to initialize exam attempt",
        variant: "destructive"
      });
    }
  });
  
  // Update exam attempt
  const updateAttemptMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      return await apiRequest('PUT', `/api/exam-attempts/${id}`, data);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setCurrentExamAttempt(data);
      navigate(`/results/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit exam answers",
        variant: "destructive"
      });
    }
  });
  
  // Initialize timer when exam loads
  useEffect(() => {
    if (exam && !attemptId) {
      setTimeRemaining(exam.timeLimit * 60); // Convert minutes to seconds
      
      // Create an exam attempt
      createAttemptMutation.mutate({
        userId: user?.id,
        examId: exam.id,
        score: 0,
        timeTaken: 0,
        answers: [],
        completed: false
      });
    }
  }, [exam, user, createAttemptMutation, attemptId]);
  
  // Timer logic
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmitExam();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining]);
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (exam?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // Submit exam
  const handleSubmitExam = useCallback(() => {
    if (!exam || !attemptId) return;
    
    // Calculate score
    const questions = exam.questions as any[];
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    
    const formattedAnswers = Object.entries(userAnswers).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId
    }));
    
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctOptionId) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeTaken = Math.round((new Date().getTime() - startTime.getTime()) / 1000);
    
    // Update the exam attempt
    updateAttemptMutation.mutate({
      id: attemptId,
      data: {
        score,
        timeTaken,
        answers: formattedAnswers,
        completed: true
      }
    });
  }, [exam, attemptId, userAnswers, startTime, updateAttemptMutation]);
  
  if (isExamLoading || !exam) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading exam...</div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = (exam.questions as any[])[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === (exam.questions as any[]).length - 1;
  const progress = Math.round(((currentQuestionIndex + 1) / (exam.questions as any[]).length) * 100);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Exam Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-medium text-gray-800 mb-1">{exam.title}</h2>
                <p className="text-gray-600">{exam.description}</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <div className="bg-primary text-white px-4 py-2 rounded-l flex items-center">
                  <span className="material-icons mr-2">timer</span>
                  <span id="exam-timer">{formatTime(timeRemaining)}</span>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-r">
                  <span id="question-counter">Question {currentQuestionIndex + 1} of {(exam.questions as any[]).length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Question Card */}
        <QuestionCard 
          question={currentQuestion}
          selectedAnswer={userAnswers[currentQuestion.id] || ''}
          onAnswerSelect={handleAnswerSelect}
        />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center"
          >
            <span className="material-icons mr-1">arrow_back</span>
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button onClick={handleSubmitExam} className="flex items-center">
              Submit Exam
              <span className="material-icons ml-1">check_circle</span>
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="flex items-center">
              Next
              <span className="material-icons ml-1">arrow_forward</span>
            </Button>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1}/{(exam.questions as any[]).length} questions</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default ExamScreen;
