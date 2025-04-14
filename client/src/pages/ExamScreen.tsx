import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ProgressBar from "@/components/ProgressBar";

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
        text: "What is the purpose of the setTimeout function?",
        options: [
          { id: "a", text: "To pause the execution of code" },
          { id: "b", text: "To execute a function after a specified delay" },
          { id: "c", text: "To set a timer for the page to reload" },
          { id: "d", text: "To measure code execution time" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q4",
        text: "Which method is used to add an element at the end of an array?",
        options: [
          { id: "a", text: "append()" },
          { id: "b", text: "push()" },
          { id: "c", text: "add()" },
          { id: "d", text: "insert()" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q5",
        text: "What is the result of '2' + 2 in JavaScript?",
        options: [
          { id: "a", text: "4" },
          { id: "b", text: "'22'" },
          { id: "c", text: "Error" },
          { id: "d", text: "NaN" }
        ],
        correctOptionId: "b"
      }
    ]
  }
];

export default function ExamScreen() {
  const [match, params] = useRoute("/exam/:id");
  const [, setLocation] = useLocation();
  const examId = match ? parseInt(params.id) : null;
  const exam = dummyExams.find(e => e.id === examId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!exam) {
    return <div>Exam not found</div>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  const handleAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{exam.title}</h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <ProgressBar progress={progress} />
            <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center border 
                  ${currentQuestionIndex === index 
                    ? 'bg-primary text-white border-primary' 
                    : selectedAnswers[exam.questions[index].id] 
                      ? 'bg-green-100 border-green-500 text-green-700' 
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl mb-4">Question {currentQuestionIndex + 1}</h2>
          <p className="text-lg mb-6">{currentQuestion.text}</p>

          <div className="space-y-4">
            {currentQuestion.options.map(option => (
              <Button
                key={option.id}
                variant={selectedAnswers[currentQuestion.id] === option.id ? "default" : "outline"}
                className="w-full justify-start text-left"
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>
            {currentQuestionIndex === exam.questions.length - 1 ? (
              <Button
                onClick={() => {
                  const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
                  const attempt = {
                    examId: examId,
                    score,
                    timeTaken: 900 - timeLeft,
                    answers: Object.entries(selectedAnswers).map(([questionId, optionId]) => ({
                      questionId,
                      selectedOptionId: optionId
                    }))
                  };
                  
                  toast({
                    title: "Exam Submitted",
                    description: "Your answers have been recorded."
                  });
                  setLocation(`/results/${examId}`);
                }}
                variant="default"
              >
                Submit Exam
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}