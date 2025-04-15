import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names with Tailwind CSS classes
 * @param inputs - Class names to be combined
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a localized string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
}

/**
 * Formats seconds into MM:SS format
 * @param seconds - Number of seconds
 * @returns Formatted time string (MM:SS)
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Calculates the percentage of correct answers
 * @param correct - Number of correct answers
 * @param total - Total number of questions
 * @returns Percentage (0-100)
 */
export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Generates user initials from their name
 * @param name - User's full name
 * @returns Initials (up to 2 characters)
 */
export function getInitials(name: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Generates a consistent color based on a string input
 * @param input - String to generate color from (e.g., username)
 * @returns CSS color class
 */
export function getConsistentColor(input: string): string {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-rose-500",
    "bg-emerald-500",
  ];
  
  if (!input) return colors[0];
  
  // Generate a consistent index based on the input string
  const index = input
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
  
  return colors[index];
}

/**
 * Gets a score color class based on the percentage
 * @param score - Score percentage (0-100)
 * @returns CSS color class
 */
export function getScoreColorClass(score: number): string {
  if (score >= 90) return "text-green-500";
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-primary";
  if (score >= 30) return "text-yellow-500";
  return "text-red-500";
}

/**
 * Gets a progress bar color class based on the percentage
 * @param progress - Progress percentage (0-100)
 * @returns CSS color class
 */
export function getProgressColorClass(progress: number): string {
  if (progress >= 90) return "bg-green-500";
  if (progress >= 70) return "bg-green-400";
  if (progress >= 50) return "bg-primary";
  if (progress >= 30) return "bg-yellow-500";
  return "bg-red-500";
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, length: number = 50): string {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}
