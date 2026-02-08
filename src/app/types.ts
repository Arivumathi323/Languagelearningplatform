export type ExerciseType = 'multiple-choice' | 'translation' | 'fill-in-blank';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string;
  translation?: string;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  xpReward: number;
  completed: boolean;
  locked: boolean;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  icon: string;
}

export interface UserProgress {
  totalXP: number;
  streak: number;
  level: number;
  lessonsCompleted: number;
  achievements: Achievement[];
  learningHistory: LearningSession[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  profilePicture?: string;
  joinedDate: Date;
}

export interface UserSettings {
  dailyGoal: number;
  notifications: boolean;
  soundEffects: boolean;
  darkMode: boolean;
  language: string;
}

export interface LearningSession {
  date: string;
  xpEarned: number;
  lessonsCompleted: number;
  timeSpent: number;
}