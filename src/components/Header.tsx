import React from 'react';
import { Calendar, Flame, Award, BookOpen, AlertCircle, Download } from 'lucide-react';
import { DayProgress } from '../types';

interface HeaderProps {
  progress: Record<number, DayProgress>;
  totalDays: number;
  completedPapersCount?: number;
  totalPapers?: number;
  onErrorBookClick: () => void;
  onRoutineClick: () => void;
  onDownloadDataClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  totalDays,
  completedPapersCount = 0,
  totalPapers = 20,
  onErrorBookClick,
  onRoutineClick,
  onDownloadDataClick,
}) => {
  // Count fully completed days
  const completedDaysCount = Object.keys(progress).filter(
    (key) => {
      const p = progress[Number(key)];
      return p && p.physicsDone && p.chemistryDone && p.biologyDone && p.mcqsDone && p.revisionDone;
    }
  ).length;

  const percentage = Math.round((completedDaysCount / totalDays) * 100);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        {/* Top Branding & Titles */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] sm:text-xs font-semibold tracking-wide uppercase mb-1">
              <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              NEET 2027 Master Series • 200 Days Plan
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              NEET 2027 — 200 DAYS MASTER PLANNER
            </h1>
            <p className="text-xs sm:text-base font-bold text-indigo-600 tracking-wide uppercase mt-0.5">
              100% SYLLABUS & 20 PRACTICE PAPERS COMPLETED BY DAY 200
            </p>
          </div>

          {/* Quick Action Badges / Stat Pods: Horizontally scrollable on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto touch-scroll pb-1 sm:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
            <button
              onClick={onRoutineClick}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer active:scale-95"
              title="Daily time allocation & study structure"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Routine Guide</span>
            </button>

            <button
              onClick={onErrorBookClick}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer active:scale-95"
              title="Open your digital mistake tracker"
            >
              <AlertCircle className="w-4 h-4 text-purple-600" />
              <span>Error Notebook</span>
            </button>

            <button
              onClick={onDownloadDataClick}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer active:scale-95"
              title="Download full 200 days schedule in CSV, JSON & backup data"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Download Data</span>
            </button>

            {/* Practice Papers Badge */}
            <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs sm:text-sm font-bold shadow-2xs">
              <Award className="w-4 h-4 text-amber-600" />
              <span>
                Papers: <span className="text-amber-700 font-extrabold">{completedPapersCount}/{totalPapers}</span>
              </span>
            </div>

            {/* Progress Pill */}
            <div className="shrink-0 flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Flame className={`w-4 h-4 ${completedDaysCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                <span className="text-xs sm:text-sm font-bold text-slate-800 whitespace-nowrap">
                  {completedDaysCount}/{totalDays} Days
                </span>
              </div>
              <div className="w-16 sm:w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-indigo-700">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* High-level Academic Pillars Bar - scrollable horizontally on small screens */}
        <div className="mt-2.5 pt-2 sm:mt-3 sm:pt-3 border-t border-slate-100 flex items-center gap-3 overflow-x-auto touch-scroll no-scrollbar sm:grid sm:grid-cols-4 sm:gap-2 text-[11px] sm:text-xs">
          <div className="shrink-0 flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span className="font-bold text-slate-900">Physics:</span> Class + Numericals + MCQs
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            <span className="font-bold text-slate-900">Chemistry:</span> Concept + Numericals + MCQs
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            <span className="font-bold text-slate-900">Biology:</span> NCERT Line-by-Line + PYQs
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-slate-600 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span className="font-bold text-slate-900">Mocks:</span> 20 Full-Length Papers
          </div>
        </div>
      </div>
    </header>
  );
};
