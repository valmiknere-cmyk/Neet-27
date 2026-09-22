import React from 'react';
import { X, BookOpen, Clock, Target, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DailyRoutineGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyRoutineGuide: React.FC<DailyRoutineGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto touch-scroll">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[94vh] sm:max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="p-3.5 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <h2 className="text-base sm:text-xl font-black tracking-tight leading-tight">
                NEET 2027 Daily Study Routine & Structure
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Mandatory: Physics + Chemistry + Biology studied & practiced every single day.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-6 overflow-y-auto touch-scroll scrollbar-thin space-y-4 text-slate-800 text-xs sm:text-sm">
          {/* Daily Golden Rule */}
          <div className="p-3 sm:p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
            <h3 className="font-extrabold text-indigo-950 text-xs sm:text-sm flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0" />
              The Non-Negotiable Rule for NEET 2027 Aspirants:
            </h3>
            <p className="text-indigo-900 text-[11px] sm:text-xs leading-relaxed">
              Never dedicate an entire day to just one subject. NEET tests all three subjects simultaneously in one 3-hour-20-minute window. Daily switching builds mental agility and prevents subject fatigue.
            </p>
          </div>

          {/* Time Budget Breakdown */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-600 shrink-0" />
              Recommended 8-Hour Daily Study Allocation:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50/80 border border-blue-200">
                <span className="text-[11px] font-black uppercase text-blue-900 tracking-wider block">
                  PHYSICS • 2.5 Hours
                </span>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                  • 60 min: Concept / Class lecture
                  <br />
                  • 45 min: Solved numericals & formulas
                  <br />
                  • 45 min: 30–45 Numerical MCQs
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
                <span className="text-[11px] font-black uppercase text-indigo-900 tracking-wider block">
                  CHEMISTRY • 2.0 Hours
                </span>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                  • 50 min: Theory / Class notes
                  <br />
                  • 35 min: NCERT in-text & reactions
                  <br />
                  • 35 min: 35–40 MCQs & PYQs
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-purple-50/80 border border-purple-200">
                <span className="text-[11px] font-black uppercase text-purple-900 tracking-wider block">
                  BIOLOGY • 2.5 Hours
                </span>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                  • 75 min: NCERT Line-by-Line deep read
                  <br />
                  • 30 min: Diagrams & summary recall
                  <br />
                  • 45 min: 45–50 Line-based MCQs & PYQs
                </p>
              </div>
            </div>
          </div>

          {/* 1 Hour Revision Protocol */}
          <div className="p-3 sm:p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
            <span className="text-[11px] font-black uppercase text-amber-950 tracking-wider block">
              FINAL 1 HOUR: REVISION & ERROR-BOOK LOGGING
            </span>
            <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed">
              Before ending your day:
              <br />
              1. Review formula flashcards created today.
              <br />
              2. Log 2–5 tricky questions into your Digital Error Notebook.
              <br />
              3. Do 10 minutes of active recall on today’s Biology tables.
            </p>
          </div>

          {/* 200 Days Roadmap Milestones */}
          <div className="space-y-1.5 border-t border-slate-200 pt-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
              The 200-Day Mastery Milestones:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900">Days 1–80:</strong> 100% Class 11 Complete + 4 Unit Tests
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900">Days 81–140:</strong> 100% Class 12 Complete + 4 Unit Tests
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900">Days 141–180:</strong> Complete 11+12 Revision + 4 Full Mocks
              </div>
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 font-semibold">
                <strong>Days 181–200:</strong> 8 Final Full Mocks (20 Total Papers Completed!)
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer active:scale-95"
          >
            Got It, Back to Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
