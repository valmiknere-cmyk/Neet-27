import { DaySchedule } from '../types';
import { PHASE_1_DAYS } from './phase1Days';
import { PHASE_2_DAYS } from './phase2Days';
import { PHASE_3_DAYS } from './phase3Days';
import { PHASE_4_DAYS } from './phase4Days';

export { PHASE_1_DAYS } from './phase1Days';
export { PHASE_2_DAYS } from './phase2Days';
export { PHASE_3_DAYS } from './phase3Days';
export { PHASE_4_DAYS } from './phase4Days';

// The Full 200-Day Master Schedule for NEET 2027
// 100% Complete Syllabus (Class 11 & 12) + 20 Full-Length Practice Papers Completed by Day 200!
export const NEET_200_DAYS_SCHEDULE: DaySchedule[] = [
  ...PHASE_1_DAYS,
  ...PHASE_2_DAYS,
  ...PHASE_3_DAYS,
  ...PHASE_4_DAYS,
];

// Backward-compatibility alias for the first 30 days
export const NEET_30_DAYS_SCHEDULE: DaySchedule[] = NEET_200_DAYS_SCHEDULE.slice(0, 30);
