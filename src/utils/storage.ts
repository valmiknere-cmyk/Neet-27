import { DayProgress } from '../types';

const PROGRESS_STORAGE_KEY = 'neet2027_30days_progress';
const ERROR_BOOK_STORAGE_KEY = 'neet2027_error_book';

export interface ErrorBookEntry {
  id: string;
  dayNumber: number;
  subject: 'Physics' | 'Chemistry' | 'Biology';
  topic: string;
  mistakeDescription: string;
  correctConcept: string;
  resolved: boolean;
  createdAt: string;
}

export function loadProgress(): Record<number, DayProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load progress', e);
    return {};
  }
}

export function saveProgress(progress: Record<number, DayProgress>): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function loadErrorBook(): ErrorBookEntry[] {
  try {
    const raw = localStorage.getItem(ERROR_BOOK_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load error book', e);
    return [];
  }
}

export function saveErrorBook(entries: ErrorBookEntry[]): void {
  try {
    localStorage.setItem(ERROR_BOOK_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save error book', e);
  }
}
