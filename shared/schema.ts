import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

// Exams table schema
export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  language: text("language").notNull(),
  level: text("level").notNull(),
  description: text("description").notNull(),
  timeLimit: integer("time_limit").notNull(), // in minutes
  questions: json("questions").notNull(), // Array of questions
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExamSchema = createInsertSchema(exams).pick({
  title: true,
  language: true,
  level: true,
  description: true,
  timeLimit: true,
  questions: true,
});

// User exam attempts schema
export const examAttempts = pgTable("exam_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  examId: integer("exam_id").notNull(),
  score: integer("score").notNull(),
  timeTaken: integer("time_taken").notNull(), // in seconds
  answers: json("answers").notNull(), // User's answers
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExamAttemptSchema = createInsertSchema(examAttempts).pick({
  userId: true,
  examId: true,
  score: true,
  timeTaken: true,
  answers: true,
  completed: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Exam = typeof exams.$inferSelect;
export type InsertExam = z.infer<typeof insertExamSchema>;

export type ExamAttempt = typeof examAttempts.$inferSelect;
export type InsertExamAttempt = z.infer<typeof insertExamAttemptSchema>;

// Question and answer types for the JSON fields
export type QuestionOption = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  category?: string; // e.g., vocabulary, grammar, etc.
};

export type UserAnswer = {
  questionId: string;
  selectedOptionId: string;
};
