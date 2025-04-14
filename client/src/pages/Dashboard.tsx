import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import CircularProgressBar from "@/components/CircularProgressBar";
import RecentActivityTable from "@/components/RecentActivityTable";
import LanguageProgress from "@/components/LanguageProgress";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get user's exam attempts
  const { data: examAttempts, isLoading: isAttemptsLoading } = useQuery({
    queryKey: ["/api/user/exam-attempts"],
    enabled: !!user
  });
  
  // Get all exams for recommendations
  const { data: exams, isLoading: isExamsLoading } = useQuery({
    queryKey: ["/api/exams"],
    enabled: !!user
  });
  
  if (isAttemptsLoading || isExamsLoading) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-2">Loading dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate dashboard metrics
  const completedExams = examAttempts?.filter(attempt => attempt.completed) || [];
  const totalScore = completedExams.reduce((sum, attempt) => sum + attempt.score, 0);
  const averageScore = completedExams.length > 0 ? Math.round(totalScore / completedExams.length) : 0;
  
  // Extract languages from exam attempts
  const languages = [...new Set(completedExams.map(attempt => {
    const exam = exams?.find(e => e.id === attempt.examId);
    return exam?.language || '';
  }))].filter(lang => lang !== '');
  
  // Generate language progress data
  const languageProgressData = languages.map(language => {
    const languageAttempts = completedExams.filter(attempt => {
      const exam = exams?.find(e => e.id === attempt.examId);
      return exam?.language === language;
    });
    
    const totalLanguageScore = languageAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const averageLanguageScore = languageAttempts.length > 0 ? 
      Math.round(totalLanguageScore / languageAttempts.length) : 0;
    
    // Generate random scores for subcategories (in a real app, this would be calculated from actual data)
    const vocabScore = Math.min(100, Math.max(0, averageLanguageScore + Math.floor(Math.random() * 20) - 10));
    const grammarScore = Math.min(100, Math.max(0, averageLanguageScore + Math.floor(Math.random() * 20) - 10));
    const comprehensionScore = Math.min(100, Math.max(0, averageLanguageScore + Math.floor(Math.random() * 20) - 10));
    
    return {
      language,
      level: languageAttempts.length > 5 ? "Intermediate" : "Beginner",
      progress: averageLanguageScore,
      vocabulary: vocabScore,
      grammar: grammarScore,
      comprehension: comprehensionScore
    };
  });
  
  // Get recommended exams (exams not attempted or failed)
  const recommendedExams = exams?.filter(exam => {
    const attempted = examAttempts?.some(attempt => 
      attempt.examId === exam.id && attempt.completed && attempt.score > 70
    );
    return !attempted;
  }).slice(0, 2) || [];
  
  // Format recent activity for the table
  const recentActivity = completedExams
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)
    .map(attempt => {
      const exam = exams?.find(e => e.id === attempt.examId);
      return {
        examTitle: exam?.title || "Unknown Exam",
        date: new Date(attempt.createdAt).toLocaleDateString(),
        score: attempt.score,
        time: Math.floor(attempt.timeTaken / 60) + ":" + (attempt.timeTaken % 60).toString().padStart(2, '0')
      };
    });
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Welcome back, {user?.name || 'Student'}!</h2>
          <p className="text-gray-600">Continue your language learning journey</p>
        </div>
        
        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Your Progress</h3>
                <span className="material-icons text-primary">bar_chart</span>
              </div>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-3xl font-medium text-primary mb-1">{completedExams.length}</div>
                  <div className="text-gray-600 text-sm">Exams Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-medium text-primary mb-1">{averageScore}%</div>
                  <div className="text-gray-600 text-sm">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-medium text-primary mb-1">{languages.length}</div>
                  <div className="text-gray-600 text-sm">Languages</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Current Streak</h3>
                <span className="material-icons text-orange-500">local_fire_department</span>
              </div>
              <div className="flex items-center">
                <CircularProgressBar 
                  percentage={80} 
                  size={80} 
                  strokeWidth={8} 
                  color="text-orange-500" 
                  label="80%" 
                />
                <div className="ml-4">
                  <div className="font-medium text-lg mb-1">4 day streak</div>
                  <div className="text-gray-600">Complete today's exam to continue your streak!</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Recommended</h3>
                <span className="material-icons text-teal-500">recommend</span>
              </div>
              {recommendedExams.map((exam, index) => (
                <a 
                  key={index}
                  href={`/exam/${exam.id}`} 
                  className="block p-4 border border-gray-200 rounded hover:bg-gray-50 mb-3"
                >
                  <div className="font-medium mb-1">{exam.title}</div>
                  <div className="text-sm text-gray-600">
                    {index === 0 ? "Continue where you left off" : "Suggested based on your progress"}
                  </div>
                </a>
              ))}
              {recommendedExams.length === 0 && (
                <div className="p-4 border border-gray-200 rounded">
                  <div className="text-gray-600">No recommendations yet. Start taking exams!</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
              <a href="/exams" className="text-primary text-sm font-medium hover:text-primary-dark">View All</a>
            </div>
            <RecentActivityTable activities={recentActivity} />
          </CardContent>
        </Card>
        
        {/* Language Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">Language Progress</h3>
              <div className="flex">
                <button className="px-3 py-1 rounded text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 mr-2">Week</button>
                <button className="px-3 py-1 rounded text-sm font-medium bg-primary text-white hover:bg-primary-dark">Month</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {languageProgressData.map((language, index) => (
                <LanguageProgress key={index} data={language} />
              ))}
              {languageProgressData.length === 0 && (
                <div className="col-span-3 text-center p-10 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No language progress yet</h4>
                  <p className="text-gray-500">Complete exams to see your language progress tracking</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
