import { 
  users, User, InsertUser, 
  exams, Exam, InsertExam,
  examAttempts, ExamAttempt, InsertExamAttempt,
  Question, UserAnswer
} from "@shared/schema";

// Modify the interface with all required CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Exam methods
  getAllExams(): Promise<Exam[]>;
  getExam(id: number): Promise<Exam | undefined>;
  createExam(exam: InsertExam): Promise<Exam>;
  
  // Exam attempt methods
  createExamAttempt(attempt: InsertExamAttempt): Promise<ExamAttempt>;
  getExamAttempt(id: number): Promise<ExamAttempt | undefined>;
  getExamAttemptsByUserId(userId: number): Promise<ExamAttempt[]>;
  getExamAttemptsByExamId(examId: number): Promise<ExamAttempt[]>;
  updateExamAttempt(id: number, attempt: Partial<InsertExamAttempt>): Promise<ExamAttempt | undefined>;
  
  // Leaderboard methods
  getLeaderboard(): Promise<{user: User, score: number, examsCompleted: number}[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private exams: Map<number, Exam>;
  private examAttempts: Map<number, ExamAttempt>;
  private currentUserId: number;
  private currentExamId: number;
  private currentAttemptId: number;

  constructor() {
    this.users = new Map();
    this.exams = new Map();
    this.examAttempts = new Map();
    this.currentUserId = 1;
    this.currentExamId = 1;
    this.currentAttemptId = 1;
    
    // Add sample exams
    this.initializeExams();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }
  
  async getAllExams(): Promise<Exam[]> {
    return Array.from(this.exams.values());
  }
  
  async getExam(id: number): Promise<Exam | undefined> {
    return this.exams.get(id);
  }
  
  async createExam(insertExam: InsertExam): Promise<Exam> {
    const id = this.currentExamId++;
    const exam: Exam = {
      ...insertExam,
      id,
      createdAt: new Date()
    };
    this.exams.set(id, exam);
    return exam;
  }
  
  async createExamAttempt(insertAttempt: InsertExamAttempt): Promise<ExamAttempt> {
    const id = this.currentAttemptId++;
    const attempt: ExamAttempt = {
      ...insertAttempt,
      id,
      createdAt: new Date()
    };
    this.examAttempts.set(id, attempt);
    return attempt;
  }
  
  async getExamAttempt(id: number): Promise<ExamAttempt | undefined> {
    return this.examAttempts.get(id);
  }
  
  async getExamAttemptsByUserId(userId: number): Promise<ExamAttempt[]> {
    return Array.from(this.examAttempts.values()).filter(
      (attempt) => attempt.userId === userId
    );
  }
  
  async getExamAttemptsByExamId(examId: number): Promise<ExamAttempt[]> {
    return Array.from(this.examAttempts.values()).filter(
      (attempt) => attempt.examId === examId
    );
  }
  
  async updateExamAttempt(id: number, data: Partial<InsertExamAttempt>): Promise<ExamAttempt | undefined> {
    const attempt = this.examAttempts.get(id);
    if (!attempt) return undefined;
    
    const updatedAttempt: ExamAttempt = {
      ...attempt,
      ...data
    };
    
    this.examAttempts.set(id, updatedAttempt);
    return updatedAttempt;
  }
  
  async getLeaderboard(): Promise<{user: User, score: number, examsCompleted: number}[]> {
    // Get all users and their exam attempts
    const users = Array.from(this.users.values());
    const result = [];
    
    for (const user of users) {
      const attempts = await this.getExamAttemptsByUserId(user.id);
      const completedAttempts = attempts.filter(attempt => attempt.completed);
      
      if (completedAttempts.length > 0) {
        const totalScore = completedAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
        const averageScore = Math.round(totalScore / completedAttempts.length);
        
        result.push({
          user,
          score: averageScore,
          examsCompleted: completedAttempts.length
        });
      }
    }
    
    // Sort by score descending
    return result.sort((a, b) => b.score - a.score);
  }
  
  // Initialize the storage with sample exams
  private initializeExams() {
    const sampleExams: InsertExam[] = [
      {
        title: "Spanish: Basic Vocabulary",
        language: "Spanish",
        level: "Beginner",
        description: "Test your knowledge of essential Spanish vocabulary for everyday conversations.",
        timeLimit: 15,
        questions: [
          {
            id: "q1",
            text: "What is the Spanish word for 'book'?",
            options: [
              { id: "a", text: "Libro" },
              { id: "b", text: "Mesa" },
              { id: "c", text: "Pluma" },
              { id: "d", text: "Puerta" }
            ],
            correctOptionId: "a",
            category: "vocabulary"
          },
          {
            id: "q2",
            text: "How do you say 'goodbye' in Spanish?",
            options: [
              { id: "a", text: "Hola" },
              { id: "b", text: "Gracias" },
              { id: "c", text: "Adiós" },
              { id: "d", text: "Buenos días" }
            ],
            correctOptionId: "c",
            category: "vocabulary"
          },
          {
            id: "q3",
            text: "Which word means 'water' in Spanish?",
            options: [
              { id: "a", text: "Pan" },
              { id: "b", text: "Agua" },
              { id: "c", text: "Vino" },
              { id: "d", text: "Leche" }
            ],
            correctOptionId: "b",
            category: "vocabulary"
          }
        ]
      },
      {
        title: "French: Common Phrases",
        language: "French",
        level: "Beginner",
        description: "Learn essential French phrases for travelers and everyday situations.",
        timeLimit: 10,
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
            correctOptionId: "a",
            category: "phrases"
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
            correctOptionId: "b",
            category: "phrases"
          }
        ]
      },
      {
        title: "German: Grammar Basics",
        language: "German",
        level: "Beginner",
        description: "Master the fundamentals of German grammar with this comprehensive test.",
        timeLimit: 20,
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
            correctOptionId: "c",
            category: "grammar"
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
            correctOptionId: "a",
            category: "grammar"
          }
        ]
      }
    ];
    
    sampleExams.forEach(exam => {
      this.createExam(exam);
    });
  }
}

export const storage = new MemStorage();
