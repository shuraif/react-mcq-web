import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

// Dummy exam data
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
  },
  {
    id: 4,
    title: "SQL Basics",
    language: "SQL",
    level: "Beginner",
    description: "Learn fundamental SQL queries and database concepts.",
    timeLimit: 15,
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    questions: [
      {
        id: "q1",
        text: "Which SQL command is used to retrieve data from a database?",
        options: [
          { id: "a", text: "GET" },
          { id: "b", text: "OPEN" },
          { id: "c", text: "SELECT" },
          { id: "d", text: "EXTRACT" }
        ],
        correctOptionId: "c"
      },
      {
        id: "q2",
        text: "Which SQL clause is used to filter records?",
        options: [
          { id: "a", text: "FILTER" },
          { id: "b", text: "WHERE" },
          { id: "c", text: "LIMIT" },
          { id: "d", text: "HAVING" }
        ],
        correctOptionId: "b"
      }
    ]
  },
  {
    id: 5,
    title: "Data Structures",
    language: "Computer Science",
    level: "Intermediate",
    description: "Test your understanding of common data structures and their operations.",
    timeLimit: 25,
    imageUrl: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55",
    questions: [
      {
        id: "q1",
        text: "What is the time complexity of searching an element in a hash table in the average case?",
        options: [
          { id: "a", text: "O(1)" },
          { id: "b", text: "O(log n)" },
          { id: "c", text: "O(n)" },
          { id: "d", text: "O(n²)" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q2",
        text: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: [
          { id: "a", text: "Queue" },
          { id: "b", text: "Stack" },
          { id: "c", text: "Linked List" },
          { id: "d", text: "Binary Tree" }
        ],
        correctOptionId: "b"
      }
    ]
  },
  {
    id: 6,
    title: "Advanced JavaScript",
    language: "JavaScript",
    level: "Advanced",
    description: "Challenge yourself with advanced JavaScript concepts like closures, prototypes, and async programming.",
    timeLimit: 30,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    questions: [
      {
        id: "q1",
        text: "What will be the output of: (function(x) { return (function(y) { console.log(x); })(2); })(1);",
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "2" },
          { id: "c", text: "undefined" },
          { id: "d", text: "Error" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q2",
        text: "Which of the following is NOT a JavaScript promise state?",
        options: [
          { id: "a", text: "Pending" },
          { id: "b", text: "Fulfilled" },
          { id: "c", text: "Rejected" },
          { id: "d", text: "Paused" }
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
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Available Programming Exams</h2>
          <p className="text-gray-600">Choose an exam to test your programming and IT knowledge</p>
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
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
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
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <Select value={filters.skill} onValueChange={(value) => handleFilterChange("skill", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="algorithms">Algorithms & Data Structures</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
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
