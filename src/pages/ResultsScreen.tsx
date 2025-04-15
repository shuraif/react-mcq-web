import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CircularProgressBar from "@/components/CircularProgressBar";
import { AlertCircle } from "lucide-react";

const ResultsScreen = () => {
  const [, navigate] = useLocation();

  // Dummy results data
  const dummyResults = {
    score: 85,
    timeTaken: 720, // 12 minutes
    correctAnswers: 17,
    totalQuestions: 20,
    categoryScores: [
      { category: "Syntax", score: 90 },
      { category: "Concepts", score: 85 },
      { category: "Problem Solving", score: 80 },
      { category: "Best Practices", score: 85 }
    ]
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Card className="p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Exam Completed!</h2>
            <p className="text-gray-600">JavaScript Fundamentals</p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <CircularProgressBar 
                percentage={dummyResults.score} 
                size={120} 
                strokeWidth={10} 
                color={dummyResults.score >= 70 ? "text-green-500" : "text-orange-500"}
                label={`${dummyResults.score}%`}
                sublabel="Score"
              />
            </div>
            <div className="grid grid-cols-3 gap-8 w-full max-w-md">
              <div className="text-center">
                <div className="text-2xl font-medium text-primary mb-1">
                  {dummyResults.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-red-500 mb-1">
                  {dummyResults.totalQuestions - dummyResults.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-teal-500 mb-1">
                  {formatTime(dummyResults.timeTaken)}
                </div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Performance Analysis</h3>
            <div className="space-y-4">
              {dummyResults.categoryScores.map((category, index) => (
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

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Recommendation</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    {dummyResults.score >= 90 
                      ? "Excellent work! You're ready to move to more advanced exams in this language." 
                      : dummyResults.score >= 70 
                      ? "Great job! Consider practicing more with similar exams to improve further." 
                      : "Keep practicing! Focus on improving your knowledge in categories where you scored lower."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={() => navigate('/exams')} 
              className="flex-1"
            >
              Take Another Exam
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')} 
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