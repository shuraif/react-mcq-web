import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "@/components/ProgressBar";

// Dummy exams data (same as in Exams.tsx)
const dummyExams = [
  {
    id: 1,
    title: "Spanish Basics",
    language: "Spanish",
    level: "Beginner",
    description: "Learn fundamental Spanish vocabulary and simple phrases.",
    timeLimit: 15,
    imageUrl: "https://images.unsplash.com/photo-1592495639839-4eae9bb1d35a",
    questions: [
      {
        id: "q1",
        text: "What is 'water' in Spanish?",
        options: [
          { id: "a", text: "Pan" },
          { id: "b", text: "Agua" },
          { id: "c", text: "Vino" },
          { id: "d", text: "Leche" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q2",
        text: "How do you say 'hello' in Spanish?",
        options: [
          { id: "a", text: "Hola" },
          { id: "b", text: "Adiós" },
          { id: "c", text: "Gracias" },
          { id: "d", text: "Por favor" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q3",
        text: "What is 'dog' in Spanish?",
        options: [
          { id: "a", text: "Gato" },
          { id: "b", text: "Perro" },
          { id: "c", text: "Pájaro" },
          { id: "d", text: "Pez" }
        ],
        correctOptionId: "b"
      }
    ]
  },
  {
    id: 2,
    title: "French: Common Phrases",
    language: "French",
    level: "Beginner",
    description: "Learn essential French phrases for travelers and everyday situations.",
    timeLimit: 10,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    questions: [
      {
        id: "q1",
        text: "How do you say 'Hello' in French?",
        options: [
          { id: "a", text: "Bonjour" },
          { id: "b", text: "Merci" },
          { id: "c", text: "Au revoir" },
          { id: "d", text: "S'il vous plaît" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q2",
        text: "What is the French phrase for 'How are you?'",
        options: [
          { id: "a", text: "Je m'appelle" },
          { id: "b", text: "Comment allez-vous?" },
          { id: "c", text: "Je ne sais pas" },
          { id: "d", text: "Où est...?" }
        ],
        correctOptionId: "b"
      }
    ]
  }
];

// Simple question card component for this page
const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect 
}: { 
  question: any, 
  selectedAnswer: string, 
  onAnswerSelect: (questionId: string, optionId: string) => void 
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">{question.text}</h3>
        <div className="space-y-3">
          {question.options.map((option: any) => (
            <div 
              key={option.id}
              className={`p-4 border rounded cursor-pointer transition-colors ${
                selectedAnswer === option.id 
                  ? 'bg-primary/10 border-primary' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => onAnswerSelect(question.id, option.id)}
            >
              <div className="flex items-center">
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                  selectedAnswer === option.id 
                    ? 'border-primary' 
                    : 'border-gray-400'
                }`}>
                  {selectedAnswer === option.id && (
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                  )}
                </div>
                <span>{option.text}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ExamScreen = () => {
  const [, params] = useRoute('/exam/:id');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const examId = parseInt(params?.id || '0');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: string}>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [startTime] = useState<Date>(new Date());
  
  // Find exam from dummy data 
  const exam = dummyExams.find(e => e.id === examId);
  
  // Initialize timer when exam loads
  useEffect(() => {
    if (exam) {
      setTimeRemaining(exam.timeLimit * 60); // Convert minutes to seconds
    }
  }, [exam]);
  
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
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
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
    if (!exam) return;
    
    // Calculate score
    const questions = exam.questions;
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctOptionId) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Show completion message
    toast({
      title: "Exam Completed!",
      description: `You scored ${score}% (${correctAnswers} out of ${totalQuestions} correct)`,
    });
    
    // Navigate back to exams list
    navigate('/exams');
  }, [exam, userAnswers, navigate, toast]);
  
  if (!exam) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Exam not found</div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7 7M5 12l7-7"></path>
            </svg>
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button onClick={handleSubmitExam} className="flex items-center">
              Submit Exam
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="flex items-center">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
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
