import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

// Dummy exam data
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
  },
  {
    id: 3,
    title: "German: Grammar Basics",
    language: "German",
    level: "Beginner",
    description: "Master the fundamentals of German grammar with this comprehensive test.",
    timeLimit: 20,
    imageUrl: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b",
    questions: [
      {
        id: "q1",
        text: "What is the correct definite article for 'book' in German?",
        options: [
          { id: "a", text: "der" },
          { id: "b", text: "die" },
          { id: "c", text: "das" },
          { id: "d", text: "dem" }
        ],
        correctOptionId: "c"
      },
      {
        id: "q2",
        text: "Which form of 'to be' is correct for 'I am' in German?",
        options: [
          { id: "a", text: "bin" },
          { id: "b", text: "ist" },
          { id: "c", text: "sind" },
          { id: "d", text: "seid" }
        ],
        correctOptionId: "a"
      }
    ]
  },
  {
    id: 4,
    title: "Italian for Travelers",
    language: "Italian",
    level: "Beginner",
    description: "Learn practical Italian phrases for your next trip to Italy.",
    timeLimit: 15,
    imageUrl: "https://images.unsplash.com/photo-1529155197886-f268835c8a17",
    questions: [
      {
        id: "q1",
        text: "How do you say 'please' in Italian?",
        options: [
          { id: "a", text: "Grazie" },
          { id: "b", text: "Prego" },
          { id: "c", text: "Per favore" },
          { id: "d", text: "Ciao" }
        ],
        correctOptionId: "c"
      }
    ]
  },
  {
    id: 5,
    title: "Portuguese Vocabulary",
    language: "Portuguese",
    level: "Intermediate",
    description: "Expand your Portuguese vocabulary with this comprehensive test.",
    timeLimit: 25,
    imageUrl: "https://images.unsplash.com/photo-1518730518541-d0843268c287",
    questions: [
      {
        id: "q1",
        text: "What does 'saudade' mean?",
        options: [
          { id: "a", text: "Happiness" },
          { id: "b", text: "A deep longing for something or someone" },
          { id: "c", text: "Beautiful" },
          { id: "d", text: "Welcome" }
        ],
        correctOptionId: "b"
      }
    ]
  },
  {
    id: 6,
    title: "Advanced Spanish Grammar",
    language: "Spanish",
    level: "Advanced",
    description: "Challenge your Spanish grammar skills with complex structures and tenses.",
    timeLimit: 30,
    imageUrl: "https://images.unsplash.com/photo-1551277949-f9f32c4059b6",
    questions: [
      {
        id: "q1",
        text: "Which tense is used in: 'Si hubiera estudiado, habría aprobado el examen'?",
        options: [
          { id: "a", text: "Pretérito perfecto" },
          { id: "b", text: "Presente de subjuntivo" },
          { id: "c", text: "Condicional perfecto" },
          { id: "d", text: "Pluscuamperfecto de subjuntivo" }
        ],
        correctOptionId: "d"
      }
    ]
  }
];

const Exams = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState({
    language: "all",
    level: "all",
    skill: "all",
    duration: "all"
  });
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };
  
  // Navigate to exam screen when an exam is selected
  const handleExamClick = (examId: number) => {
    navigate(`/exam/${examId}`);
  };
  
  // Apply filters to exams
  const filteredExams = dummyExams.filter(exam => {
    if (filters.language && filters.language !== "all" && exam.language !== filters.language) return false;
    if (filters.level && filters.level !== "all" && exam.level !== filters.level) return false;
    
    // Filter by duration range
    if (filters.duration && filters.duration !== "all") {
      if (filters.duration === "short" && exam.timeLimit > 10) return false;
      if (filters.duration === "medium" && (exam.timeLimit <= 10 || exam.timeLimit > 20)) return false;
      if (filters.duration === "long" && exam.timeLimit <= 20) return false;
    }
    
    return true;
  });
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Available Exams</h2>
          <p className="text-gray-600">Choose an exam to test your language skills</p>
        </div>
        
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner (A1-A2)</SelectItem>
                    <SelectItem value="Intermediate">Intermediate (B1-B2)</SelectItem>
                    <SelectItem value="Advanced">Advanced (C1-C2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                <Select value={filters.skill} onValueChange={(value) => handleFilterChange("skill", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="vocabulary">Vocabulary</SelectItem>
                    <SelectItem value="grammar">Grammar</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="listening">Listening</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Durations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Short (5-10 min)</SelectItem>
                    <SelectItem value="medium">Medium (10-20 min)</SelectItem>
                    <SelectItem value="long">Long (20+ min)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Exam Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => (
              <div 
                key={exam.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => handleExamClick(exam.id)}
              >
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{exam.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {exam.language}
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                      {exam.level}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {exam.timeLimit} minutes
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                      {exam.questions.length} questions
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center p-10">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No exams found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more exams</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exams;
