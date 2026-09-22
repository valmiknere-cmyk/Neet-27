import { DaySchedule, DayProgress } from '../types';
import { ErrorBookEntry } from './storage';

/**
 * Trigger direct client-side file download
 */
export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convert NEET 200 Days Schedule to clean CSV for Excel / Google Sheets
 */
export function exportScheduleToCSV(days: DaySchedule[]): string {
  const headers = [
    'Day Number',
    'Day Label',
    'Phase',
    'Week',
    'Is Milestone',
    'Practice Paper #',
    'Practice Paper Title',
    'Practice Paper Duration',
    'Physics Topic',
    'Physics Class Concept',
    'Physics Practice Target',
    'Physics MCQ Count',
    'Physics Subtopics',
    'Chemistry Topic',
    'Chemistry Class Concept',
    'Chemistry Practice Target',
    'Chemistry MCQ Count',
    'Chemistry Subtopics',
    'Biology Topic',
    'Biology NCERT Concept',
    'Biology Practice Target',
    'Biology MCQ Count',
    'Biology Subtopics',
    'Total MCQs Target',
    'PYQs Target',
    'MCQ Breakdown',
    'Revision Primary Task',
    'Error Book Focus',
    'NCERT Revision',
    'Test Session',
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = days.map((d) => [
    d.dayNumber,
    d.dayLabel,
    d.phase,
    d.week,
    d.isMilestoneDay ? 'YES' : 'NO',
    d.practicePaper ? d.practicePaper.paperNumber : '',
    d.practicePaper ? d.practicePaper.title : '',
    d.practicePaper ? d.practicePaper.duration : '',
    d.physics.topic,
    d.physics.classConcept,
    d.physics.practice,
    d.physics.mcqCount,
    d.physics.subtopics.join('; '),
    d.chemistry.topic,
    d.chemistry.classConcept,
    d.chemistry.practice,
    d.chemistry.mcqCount,
    d.chemistry.subtopics.join('; '),
    d.biology.topic,
    d.biology.classConcept,
    d.biology.practice,
    d.biology.mcqCount,
    d.biology.subtopics.join('; '),
    d.mcqPyqTarget.totalTarget,
    d.mcqPyqTarget.pyqCount,
    d.mcqPyqTarget.breakdown,
    d.revisionTask.primaryTask,
    d.revisionTask.errorBookFocus,
    d.revisionTask.ncertRevision,
    d.revisionTask.testSession || '',
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(',')),
  ].join('\r\n');

  return csvContent;
}

/**
 * Export full schedule as formatted JSON
 */
export function exportScheduleToJSON(days: DaySchedule[]): string {
  const meta = {
    title: 'NEET 2027 — 200 Days Master Study & Practice Schedule',
    generatedAt: new Date().toISOString(),
    totalDays: days.length,
    structure: 'Physics + Chemistry + Biology every single day',
    phases: [
      { phase: 1, days: 'Days 1–80', scope: '100% Class 11 Complete + 4 Unit Tests' },
      { phase: 2, days: 'Days 81–140', scope: '100% Class 12 Complete + 4 Unit Tests' },
      { phase: 3, days: 'Days 141–180', scope: 'Complete 11+12 High-Yield Revision + 4 Full Mocks' },
      { phase: 4, days: 'Days 181–200', scope: 'Final 8 Grand Full Mocks (20 Total Papers Completed)' },
    ],
    schedule: days,
  };
  return JSON.stringify(meta, null, 2);
}

/**
 * Export student study progress & notes as JSON
 */
export function exportProgressToJSON(
  progress: Record<number, DayProgress>,
  days: DaySchedule[]
): string {
  const completedDays = Object.keys(progress).filter((key) => {
    const p = progress[Number(key)];
    return p && p.physicsDone && p.chemistryDone && p.biologyDone && p.mcqsDone && p.revisionDone;
  }).length;

  const exportData = {
    exportType: 'NEET 2027 Student Study Progress Backup',
    exportedAt: new Date().toISOString(),
    totalDays: days.length,
    completedDaysCount: completedDays,
    completionPercentage: Math.round((completedDays / days.length) * 100),
    progressRecords: progress,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export error notebook entries to CSV
 */
export function exportErrorBookToCSV(entries: ErrorBookEntry[]): string {
  const headers = [
    'ID',
    'Subject',
    'Day Number',
    'Topic / Question No.',
    'Mistake / Trap Description',
    'Correct Concept / Rule',
    'Resolved Status',
    'Date Logged',
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = entries.map((e) => [
    e.id,
    e.subject,
    e.dayNumber,
    e.topic,
    e.mistakeDescription,
    e.correctConcept,
    e.resolved ? 'RESOLVED' : 'UNRESOLVED',
    e.createdAt,
  ]);

  return [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(',')),
  ].join('\r\n');
}

/**
 * Export error notebook entries to JSON
 */
export function exportErrorBookToJSON(entries: ErrorBookEntry[]): string {
  return JSON.stringify(
    {
      exportType: 'NEET 2027 Digital Error Notebook',
      exportedAt: new Date().toISOString(),
      totalEntries: entries.length,
      entries,
    },
    null,
    2
  );
}

/**
 * Export Complete Master Archive (Everything in 1 JSON file)
 */
export function exportMasterBundle(
  days: DaySchedule[],
  progress: Record<number, DayProgress>,
  errorBook: ErrorBookEntry[]
): string {
  const bundle = {
    archiveTitle: 'NEET 2027 — 200 Days Master Study & Practice Data Archive',
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    totalDays: days.length,
    totalPracticePapers: 20,
    academicRule: 'Physics + Chemistry + Biology studied & practiced every single day',
    schedule: days,
    studentProgress: progress,
    errorNotebook: errorBook,
  };
  return JSON.stringify(bundle, null, 2);
}
