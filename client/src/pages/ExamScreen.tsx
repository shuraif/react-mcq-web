import { useState, useEffect, useCallback } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "@/components/ProgressBar";

// Dummy programming exams data
const dummyExams = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    language: "JavaScript",
    level: "Beginner",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
    timeLimit: 15,
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    questions: [
      {
        id: "q1",
        text: "Which of the following is a correct way to declare a variable in JavaScript?",
        options: [
          { id: "a", text: "variable x = 5;" },
          { id: "b", text: "let x = 5;" },
          { id: "c", text: "int x = 5;" },
          { id: "d", text: "x := 5;" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q2",
        text: "What will be the output of: console.log(typeof []);",
        options: [
          { id: "a", text: "array" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "null" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q3",
        text: "Which method adds an element to the end of an array?",
        options: [
          { id: "a", text: "arr.push()" },
          { id: "b", text: "arr.pop()" },
          { id: "c", text: "arr.unshift()" },
          { id: "d", text: "arr.shift()" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q4",
        text: "What is the correct way to write an if statement in JavaScript?",
        options: [
          { id: "a", text: "if x = 5 then" },
          { id: "b", text: "if (x == 5)" },
          { id: "c", text: "if x == 5" },
          { id: "d", text: "if x = 5" }
        ],
        correctOptionId: "b"
      }
    ]
  },
  {
    id: 2,
    title: "React Basics",
    language: "JavaScript",
    level: "Intermediate",
    description: "Test your understanding of fundamental React concepts and hooks.",
    timeLimit: 20,
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    questions: [
      {
        id: "q1",
        text: "Which hook is used to perform side effects in a function component?",
        options: [
          { id: "a", text: "useState" },
          { id: "b", text: "useEffect" },
          { id: "c", text: "useContext" },
          { id: "d", text: "useReducer" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q2",
        text: "What is the correct syntax for a basic functional component in React?",
        options: [
          { id: "a", text: "function Component() { return <div>Hello</div>; }" },
          { id: "b", text: "class Component { render() { return <div>Hello</div>; } }" },
          { id: "c", text: "const Component = function() { render(<div>Hello</div>); }" },
          { id: "d", text: "component Component() => <div>Hello</div>" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q3",
        text: "How do you update state in a React functional component?",
        options: [
          { id: "a", text: "this.state.value = newValue" },
          { id: "b", text: "setValue(newValue)" },
          { id: "c", text: "state.value = newValue" },
          { id: "d", text: "setState(newValue)" }
        ],
        correctOptionId: "b"
      }
    ]
  },
  {
    id: 3,
    title: "Python Basics",
    language: "Python",
    level: "Beginner",
    description: "Master the fundamentals of Python programming language.",
    timeLimit: 15,
    imageUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0",
    questions: [
      {
        id: "q1",
        text: "How do you create a comment in Python?",
        options: [
          { id: "a", text: "// This is a comment" },
          { id: "b", text: "/* This is a comment */" },
          { id: "c", text: "# This is a comment" },
          { id: "d", text: "<!-- This is a comment -->" }
        ],
        correctOptionId: "c"
      },
      {
        id: "q2",
        text: "Which of these is not a Python data type?",
        options: [
          { id: "a", text: "int" },
          { id: "b", text: "float" },
          { id: "c", text: "char" },
          { id: "d", text: "bool" }
        ],
        correctOptionId: "c"
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
