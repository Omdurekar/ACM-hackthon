export interface User {
  id: string;
  email: string;
  username: string;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  focusDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  theme: 'obsidian' | 'amber';
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  complexity: 'low' | 'medium' | 'high';
  order: number;
  createdAt: Date;
}

export interface FocusSession {
  id: string;
  userId: string;
  taskId?: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  type: 'focus' | 'short_break' | 'long_break';
  completed: boolean;
}

export interface Suggestion {
  id: string;
  userId: string;
  content: string;
  type: 'time_allocation' | 'task_ordering' | 'daily_planning';
  createdAt: Date;
}
