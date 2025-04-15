import { Card } from "@/components/ui/card";
import { Exam } from "@shared/schema";
import { useLocation } from "wouter";

interface ExamCardProps {
  exam: Exam;
  iconIndex: number;
}

const ExamCard = ({ exam, iconIndex }: ExamCardProps) => {
  const [, navigate] = useLocation();
  
  // Different background colors and icons for variety
  const bgColors = [
    "bg-primary-light",
    "bg-teal-500",
    "bg-orange-500",
    "bg-indigo-600",
    "bg-rose-500",
    "bg-emerald-500"
  ];
  
  const icons = [
    "language",
    "school",
    "menu_book",
    "record_voice_over",
    "translate",
    "headphones"
  ];
  
  const bgColor = bgColors[iconIndex % bgColors.length];
  const icon = icons[iconIndex % icons.length];
  
  // Level badge color
  const levelColor = exam.level === "Beginner" 
    ? "bg-green-100 text-green-800" 
    : exam.level === "Intermediate"
    ? "bg-yellow-100 text-yellow-800"
    : "bg-blue-100 text-blue-800";
  
  // Questions count
  const questionsCount = (exam.questions as any[]).length;
  
  const handleStartExam = () => {
    navigate(`/exam/${exam.id}`);
  };
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className={`h-48 ${bgColor} flex items-center justify-center`}>
        <span className="material-icons text-white text-6xl">{icon}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{exam.title}</h3>
          <span className={`${levelColor} text-xs px-2 py-1 rounded-full`}>
            {exam.level}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-base mr-1">timer</span>
            {exam.timeLimit} min
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-base mr-1">help_outline</span>
            {questionsCount} questions
          </div>
        </div>
        <button 
          className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded flex items-center justify-center"
          onClick={handleStartExam}
        >
          Start Exam
        </button>
      </div>
    </Card>
  );
};

export default ExamCard;
