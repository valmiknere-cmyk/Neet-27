export interface SubjectTask {
  topic: string;
  subtopics: string[];
  classConcept: string;
  practice: string;
  mcqCount: number;
}

export interface McqPyqTarget {
  totalTarget: number;
  pyqCount: number;
  breakdown: string;
}

export interface RevisionTask {
  primaryTask: string;
  errorBookFocus: string;
  ncertRevision: string;
  testSession?: string;
}

export interface PracticePaperInfo {
  paperNumber: number;
  title: string;
  totalMarks: number;
  duration: string;
  focus: string;
  analysisTask: string;
}

export interface DaySchedule {
  dayNumber: number;
  dayLabel: string;
  phase: 1 | 2 | 3 | 4;
  phaseTitle: string;
  month: number;
  week: number;
  isMilestoneDay: boolean;
  milestoneTitle?: string;
  physics: SubjectTask;
  chemistry: SubjectTask;
  biology: SubjectTask;
  mcqPyqTarget: McqPyqTarget;
  revisionTask: RevisionTask;
  practicePaper?: PracticePaperInfo;
}

export interface DayProgress {
  physicsDone: boolean;
  chemistryDone: boolean;
  biologyDone: boolean;
  mcqsDone: boolean;
  revisionDone: boolean;
  paperScore?: number;
  userNotes?: string;
  completedAt?: string;
}

export type ViewMode = 'table' | 'cards' | 'vertical-pages';
export type PhaseFilter = 'all' | '1' | '2' | '3' | '4';
export type MonthFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type WeekFilter = 'all' | string;
