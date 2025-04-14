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
        text: "What is JSX?",
        options: [
          { id: "a", text: "A JavaScript library" },
          { id: "b", text: "A syntax extension to JavaScript" },
          { id: "c", text: "A type of CSS" },
          { id: "d", text: "A framework for building APIs" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q4",
        text: "Explain the concept of props in React.",
        options: [
          { id: "a", text: "Internal state of a component" },
          { id: "b", text: "Data passed from a parent component to a child component" },
          { id: "c", text: "A type of event handler" },
          { id: "d", text: "A way to style components" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q5",
        text: "What is the purpose of the key prop in React lists?",
        options: [
          { id: "a", text: "To style list items" },
          { id: "b", text: "To help React identify and update individual items efficiently" },
          { id: "c", text: "To store data associated with each item" },
          { id: "d", text: "It's optional and doesn't affect performance" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q6",
        text: "What is a virtual DOM?",
        options: [
          { id: "a", text: "A real DOM that is faster" },
          { id: "b", text: "A lightweight representation of the real DOM" },
          { id: "c", text: "A type of database" },
          { id: "d", text: "A way to access the server" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q7",
        text: "Explain the concept of state in React.",
        options: [
          { id: "a", text: "Data that is passed from parent to child" },
          { id: "b", text: "Data that changes over time and causes a component to re-render" },
          { id: "c", text: "A way to style the components" },
          { id: "d", text: "A type of event handler" }
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
      },
      {
        id: "q3",
        text: "What is the purpose of the `in` keyword in Python?",
        options: [
          { id: "a", text: "To define a variable" },
          { id: "b", text: "To check if a value is present in a sequence (string, list, tuple, etc.)" },
          { id: "c", text: "To define a function" },
          { id: "d", text: "To create a loop" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q4",
        text: "What is the difference between a list and a tuple in Python?",
        options: [
          { id: "a", text: "There is no difference" },
          { id: "b", text: "Lists are mutable, tuples are immutable" },
          { id: "c", text: "Lists are immutable, tuples are mutable" },
          { id: "d", text: "Lists are used for numbers, tuples are used for strings" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q5",
        text: "How do you define a function in Python?",
        options: [
          { id: "a", text: "function myFunction() {}" },
          { id: "b", text: "def myFunction():" },
          { id: "c", text: "myFunction() =" },
          { id: "d", text: "func myFunction() {}" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q6",
        text: "What is a dictionary in Python?",
        options: [
          { id: "a", text: "An ordered sequence of items" },
          { id: "b", text: "A collection of key-value pairs" },
          { id: "c", text: "A type of loop" },
          { id: "d", text: "A way to handle errors" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q7",
        text: "What is the output of: print(type(5))?",
        options: [
          { id: "a", text: "<class 'str'>" },
          { id: "b", text: "<class 'int'>" },
          { id: "c", text: "<class 'float'>" },
          { id: "d", text: "<class 'bool'>" }
        ],
        correctOptionId: "b"
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
      },
      {
        id: "q3",
        text: "What is the purpose of the `ORDER BY` clause in SQL?",
        options: [
          { id: "a", text: "To filter data" },
          { id: "b", text: "To sort the results" },
          { id: "c", text: "To group the results" },
          { id: "d", text: "To limit the number of rows returned" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q4",
        text: "What is the difference between `INNER JOIN` and `LEFT JOIN` in SQL?",
        options: [
          { id: "a", text: "There is no difference" },
          { id: "b", text: "INNER JOIN returns only matching rows, LEFT JOIN returns all rows from the left table and matching rows from the right table" },
          { id: "c", text: "INNER JOIN returns all rows from the right table, LEFT JOIN returns all rows from the left table" },
          { id: "d", text: "INNER JOIN is faster than LEFT JOIN" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q5",
        text: "What is a primary key in SQL?",
        options: [
          { id: "a", text: "A column that can contain NULL values" },
          { id: "b", text: "A unique identifier for each row in a table" },
          { id: "c", text: "A column that stores dates" },
          { id: "d", text: "A column that stores text" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q6",
        text: "What SQL command is used to add new data to a table?",
        options: [
          { id: "a", text: "UPDATE" },
          { id: "b", text: "INSERT INTO" },
          { id: "c", text: "DELETE FROM" },
          { id: "d", text: "SELECT" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q7",
        text: "What is a foreign key in SQL?",
        options: [
          { id: "a", text: "A key that is used to uniquely identify each row" },
          { id: "b", text: "A key that refers to a primary key in another table" },
          { id: "c", text: "A key that is not used for anything" },
          { id: "d", text: "A key that is used to encrypt data" }
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
      },
      {
        id: "q3",
        text: "Explain the difference between a stack and a queue.",
        options: [
          { id: "a", text: "They are the same." },
          { id: "b", text: "Stacks use LIFO, queues use FIFO (First In First Out)." },
          { id: "c", text: "Stacks use FIFO, queues use LIFO." },
          { id: "d", text: "Stacks are used for sorting, queues are used for searching." }
        ],
        correctOptionId: "b"
      },
      {
        id: "q4",
        text: "What is a binary tree?",
        options: [
          { id: "a", text: "A type of graph" },
          { id: "b", text: "A tree where each node has at most two children" },
          { id: "c", text: "A tree where each node has exactly two children" },
          { id: "d", text: "A linear data structure" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q5",
        text: "What is a linked list?",
        options: [
          { id: "a", text: "A linear data structure where elements are not stored contiguously" },
          { id: "b", text: "A type of graph" },
          { id: "c", text: "A tree-like data structure" },
          { id: "d", text: "A way to sort data" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q6",
        text: "What is a graph?",
        options: [
          { id: "a", text: "A collection of nodes and edges" },
          { id: "b", text: "A type of tree" },
          { id: "c", text: "A linear data structure" },
          { id: "d", text: "A way to represent functions" }
        ],
        correctOptionId: "a"
      },
      {
        id: "q7",
        text: "What is Big O notation used for?",
        options: [
          { id: "a", text: "To measure the size of data structures" },
          { id: "b", text: "To analyze the efficiency of algorithms" },
          { id: "c", text: "To represent functions" },
          { id: "d", text: "To encrypt data" }
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
      },
      {
        id: "q3",
        text: "Explain how `async/await` works in JavaScript.",
        options: [
          { id: "a", text: "It's a way to create synchronous code" },
          { id: "b", text: "It's a way to write asynchronous code in a more synchronous-looking style" },
          { id: "c", text: "It's used for error handling" },
          { id: "d", text: "It's used for creating timers" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q4",
        text: "What is prototypal inheritance in JavaScript?",
        options: [
          { id: "a", text: "A way to create classes" },
          { id: "b", text: "A mechanism where objects inherit properties and methods from other objects" },
          { id: "c", text: "A way to handle events" },
          { id: "d", text: "A type of data structure" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q5",
        text: "Explain the concept of hoisting in JavaScript.",
        options: [
          { id: "a", text: "Moving elements in an array" },
          { id: "b", text: "Moving variables and function declarations to the top of their scope" },
          { id: "c", text: "A way to create closures" },
          { id: "d", text: "A type of error handling" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q6",
        text: "What is the difference between `let`, `const`, and `var` in JavaScript?",
        options: [
          { id: "a", text: "They are all the same" },
          { id: "b", text: "`var` is function-scoped, `let` and `const` are block-scoped; `const` creates immutable variables." },
          { id: "c", text: "`let` is function-scoped, `const` and `var` are block-scoped" },
          { id: "d", text: "`const` is function-scoped, `let` and `var` are block-scoped" }
        ],
        correctOptionId: "b"
      },
      {
        id: "q7",
        text: "What is a Promise in JavaScript?",
        options: [
          { id: "a", text: "A type of array" },
          { id: "b", text: "An object representing the eventual completion (or failure) of an asynchronous operation" },
          { id: "c", text: "A way to handle errors" },
          { id: "d", text: "A type of loop" }
        ],
        correctOptionId: "b"
      }
    ]
  }
];

const Exams = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState({
    language: "all",
    level: "all",
    skill: "all",
    duration: "all"
  });

  const navigate = (path: string) => {
    setLocation(path);
  };

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
                    <SelectItem value="frontend">Frontend Development</SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="database">Database Management</SelectItem>
                    <SelectItem value="algorithms">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="devops">DevOps & Infrastructure</SelectItem>
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
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
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
                  <div className="flex items-center justify-between mb-4">
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
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExamClick(exam.id);
                    }}
                  >
                    Start Exam
                  </button>
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