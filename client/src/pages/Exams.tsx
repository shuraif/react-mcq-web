import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

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
      }
    ]
  },
  {
    id: 2,
    title: "Python Basics",
    language: "Python", 
    level: "Beginner",
    description: "Master the fundamentals of Python programming language.",
    timeLimit: 20,
    imageUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0",
    questions: []
  }
];

export default function Exams() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const languages = [...new Set(dummyExams.map(exam => exam.language))];
  const levels = [...new Set(dummyExams.map(exam => exam.level))];

  const filteredExams = dummyExams.filter(exam => {
    if (selectedLanguage && exam.language !== selectedLanguage) return false;
    if (selectedLevel && exam.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Languages</SelectItem>
            {languages.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Levels</SelectItem>
            {levels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map(exam => (
          <Card 
            key={exam.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/exam/${exam.id}`)}
          >
            <CardContent className="p-4">
              <img 
                src={exam.imageUrl} 
                alt={exam.title} 
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
              <p className="text-gray-600 mb-2">{exam.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {exam.language}
                </span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {exam.level}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}