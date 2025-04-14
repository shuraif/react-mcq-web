import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExam } from "@/context/ExamContext";
import CircularProgressBar from "@/components/CircularProgressBar";
import { AlertCircle } from "lucide-react";

const ResultsScreen = () => {
  const [, params] = useRoute('/results/:attemptId');
  const [, navigate] = useLocation();
  const { currentExamAttempt } = useExam();
  const attemptId = parseInt(params?.attemptId || '0');
  
  // If we have the current attempt in context, use it
  // Otherwise fetch it from the API
  const { data: attemptData, isLoading: isAttemptLoading } = useQuery({
    queryKey: [`/api/exam-attempts/${attemptId}`],
    enabled: !currentExamAttempt && !!attemptId,
  });
  
  const attempt = currentExamAttempt || attemptData;
  
  // Fetch the exam details for this attempt
  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: [`/api/exams/${attempt?.examId}`],
    enabled: !!attempt,
  });
  
  // Redirect to dashboard if no attempt data is found
  useEffect(() => {
    if (!isAttemptLoading && !attempt) {
      navigate('/dashboard');
    }
  }, [isAttemptLoading, attempt, navigate]);
  
  const handleReviewExam = () => {
    // In a real app, this would navigate to a review page
    // For now, just navigate back to exams
    navigate('/exams');
  };
  
  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };
  
  if (isAttemptLoading || isExamLoading || !attempt || !exam) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading results...</div>
        </div>
      </div>
    );
  }
  
  // Format time taken
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Generate analysis data based on categories
  const questionsByCategory: Record<string, {total: number, correct: number}> = {};
  const questions = exam.questions as any[];
  
  questions.forEach(question => {
    const category = question.category || 'uncategorized';
    const userAnswer = (attempt.answers as any[]).find(a => a.questionId === question.id);
    const isCorrect = userAnswer && userAnswer.selectedOptionId === question.correctOptionId;
    
    if (!questionsByCategory[category]) {
      questionsByCategory[category] = { total: 0, correct: 0 };
    }
    
    questionsByCategory[category].total++;
    if (isCorrect) {
      questionsByCategory[category].correct++;
    }
  });
  
  // Calculate category scores
  const categoryScores = Object.entries(questionsByCategory).map(([category, data]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize
    score: Math.round((data.correct / data.total) * 100)
  }));
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Card className="p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Exam Completed!</h2>
            <p className="text-gray-600">{exam.title}</p>
          </div>
          
          {/* Score Summary */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <CircularProgressBar 
                percentage={attempt.score} 
                size={120} 
                strokeWidth={10} 
                color={attempt.score >= 70 ? "text-green-500" : "text-orange-500"} 
                label={`${attempt.score}%`} 
                sublabel="Score"
              />
            </div>
            <div className="grid grid-cols-3 gap-8 w-full max-w-md">
              <div className="text-center">
                <div className="text-2xl font-medium text-primary mb-1">
                  {Math.round((attempt.score / 100) * questions.length)}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-red-500 mb-1">
                  {questions.length - Math.round((attempt.score / 100) * questions.length)}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-teal-500 mb-1">
                  {formatTime(attempt.timeTaken)}
                </div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>
          </div>
          
          {/* Performance Analysis */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Performance Analysis</h3>
            <div className="space-y-4">
              {categoryScores.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{category.category}</span>
                    <span className="text-sm font-medium">{category.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`rounded-full h-2 ${
                        category.score >= 90 ? 'bg-green-500' : 
                        category.score >= 70 ? 'bg-green-400' : 
                        category.score >= 50 ? 'bg-primary' : 'bg-orange-500'
                      }`} 
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommendation */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Recommendation</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    {attempt.score >= 90 
                      ? "Excellent work! You're ready to move to more advanced exams in this language." 
                      : attempt.score >= 70 
                      ? "Great job! Consider practicing more with similar exams to improve further." 
                      : "Keep practicing! Focus on improving your knowledge in categories where you scored lower."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={handleReviewExam} 
              className="flex-1"
            >
              Review Answers
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReturnToDashboard} 
              className="flex-1"
            >
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsScreen;
