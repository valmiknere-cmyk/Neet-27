import React from 'react';
import { DaySchedule, DayProgress } from '../types';
import { CheckCircle2, Circle, Award, Target, ChevronRight, FileCheck } from 'lucide-react';

interface ScheduleTableProps {
  days: DaySchedule[];
  progress: Record<number, DayProgress>;
  onToggleDay: (dayNumber: number) => void;
  onSelectDay: (day: DaySchedule) => void;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  days,
  progress,
  onToggleDay,
  onSelectDay,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Mobile Horizontal Scroll Hint */}
      <div className="sm:hidden flex items-center justify-between px-3 py-2 bg-indigo-50 border-b border-indigo-100 text-[11px] font-bold text-indigo-900">
        <span>👉 Swipe table sideways to see all 3 subjects & tasks</span>
        <span className="text-[10px] bg-indigo-200/80 text-indigo-950 px-1.5 py-0.5 rounded font-black">
          ← SCROLL →
        </span>
      </div>

      <div className="overflow-x-auto touch-scroll scrollbar-thin">
        <table className="w-full border-collapse text-left min-w-[980px]">
          {/* Table Header: DAY | PHYSICS | CHEMISTRY | BIOLOGY | MCQ/PYQ + REVISION */}
          <thead>
            <tr className="bg-slate-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider divide-x divide-slate-800">
              <th className="py-3 sm:py-4 px-3 sm:px-4 w-32 sm:w-36 sticky left-0 z-20 bg-slate-900 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.3)]">
                DAY / PHASE
              </th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 w-1/4 min-w-[210px] bg-blue-950/90 text-blue-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                  PHYSICS
                </div>
              </th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 w-1/4 min-w-[210px] bg-indigo-950/90 text-indigo-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0" />
                  CHEMISTRY
                </div>
              </th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 w-1/4 min-w-[210px] bg-purple-950/90 text-purple-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
                  BIOLOGY
                </div>
              </th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 w-1/4 min-w-[230px] bg-amber-950/90 text-amber-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                  MCQ/PYQ + PRACTICE PAPER
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 text-slate-900 text-sm">
            {days.map((day) => {
              const p = progress[day.dayNumber];
              const isCompleted =
                p && p.physicsDone && p.chemistryDone && p.biologyDone && p.mcqsDone && p.revisionDone;

              const stickyBg = day.practicePaper
                ? 'bg-amber-50'
                : day.isMilestoneDay
                ? 'bg-purple-50'
                : day.dayNumber % 2 === 0
                ? 'bg-slate-50'
                : 'bg-white';

              return (
                <tr
                  key={day.dayNumber}
                  id={`day-row-${day.dayNumber}`}
                  className={`transition-colors hover:bg-slate-50/90 divide-x divide-slate-200 ${
                    day.practicePaper
                      ? 'bg-amber-50/60 border-y-2 border-amber-400'
                      : day.isMilestoneDay
                      ? 'bg-purple-50/50 border-y-2 border-purple-300'
                      : day.dayNumber % 2 === 0
                      ? 'bg-slate-50/50'
                      : 'bg-white'
                  }`}
                >
                  {/* Column 1: DAY / PHASE - Solid background to prevent overlap transparency */}
                  <td className={`py-3 sm:py-4 px-3 sm:px-4 align-top sticky left-0 z-10 ${stickyBg} shadow-[2px_0_5px_-2px_rgba(0,0,0,0.08)]`}>
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleDay(day.dayNumber);
                          }}
                          className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer p-0.5"
                          title={isCompleted ? 'Mark incomplete' : 'Mark full day complete'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                          )}
                        </button>

                        <span
                          className={`font-black tracking-tight text-base sm:text-lg ${
                            isCompleted ? 'text-emerald-700 line-through' : 'text-slate-900'
                          }`}
                        >
                          {day.dayLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                          Phase {day.phase}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          W{day.week}
                        </span>
                      </div>

                      {day.practicePaper && (
                        <div className="mt-1 flex items-center gap-1 px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 rounded text-[10px] font-black uppercase tracking-tight">
                          <FileCheck className="w-3 h-3 text-amber-700 shrink-0" />
                          <span>Mock {day.practicePaper.paperNumber}/20</span>
                        </div>
                      )}

                      {day.isMilestoneDay && !day.practicePaper && (
                        <div className="mt-1 flex items-center gap-1 px-2 py-0.5 bg-purple-100 border border-purple-300 text-purple-900 rounded text-[10px] font-bold tracking-tight">
                          <Award className="w-3 h-3 text-purple-700 shrink-0" />
                          <span>Milestone</span>
                        </div>
                      )}

                      <button
                        onClick={() => onSelectDay(day)}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                      >
                        Details <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Column 2: PHYSICS */}
                  <td
                    className="py-4 px-3 sm:px-4 align-top cursor-pointer group"
                    onClick={() => onSelectDay(day)}
                  >
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-sm sm:text-base leading-snug">
                        {day.physics.topic}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-700 font-semibold">Concept: </strong>
                        {day.physics.classConcept}
                      </p>

                      <div className="bg-blue-50/70 border border-blue-100 rounded-md p-2 text-xs text-blue-900">
                        <strong className="font-semibold text-blue-950">Practice: </strong>
                        {day.physics.practice}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {day.physics.subtopics.slice(0, 2).map((sub, i) => (
                          <span
                            key={i}
                            className="inline-block text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Column 3: CHEMISTRY */}
                  <td
                    className="py-4 px-3 sm:px-4 align-top cursor-pointer group"
                    onClick={() => onSelectDay(day)}
                  >
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors text-sm sm:text-base leading-snug">
                        {day.chemistry.topic}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-700 font-semibold">Concept: </strong>
                        {day.chemistry.classConcept}
                      </p>

                      <div className="bg-indigo-50/70 border border-indigo-100 rounded-md p-2 text-xs text-indigo-900">
                        <strong className="font-semibold text-indigo-950">Practice: </strong>
                        {day.chemistry.practice}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {day.chemistry.subtopics.slice(0, 2).map((sub, i) => (
                          <span
                            key={i}
                            className="inline-block text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Column 4: BIOLOGY */}
                  <td
                    className="py-4 px-3 sm:px-4 align-top cursor-pointer group"
                    onClick={() => onSelectDay(day)}
                  >
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors text-sm sm:text-base leading-snug">
                        {day.biology.topic}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-700 font-semibold">NCERT Reading: </strong>
                        {day.biology.classConcept}
                      </p>

                      <div className="bg-purple-50/70 border border-purple-100 rounded-md p-2 text-xs text-purple-900">
                        <strong className="font-semibold text-purple-950">MCQs/PYQs: </strong>
                        {day.biology.practice}
                      </div>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {day.biology.subtopics.slice(0, 2).map((sub, i) => (
                          <span
                            key={i}
                            className="inline-block text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Column 5: MCQ/PYQ + PRACTICE PAPER / REVISION */}
                  <td className="py-4 px-3 sm:px-4 align-top">
                    <div className="space-y-2">
                      {/* Practice Paper Banner if applicable */}
                      {day.practicePaper && (
                        <div className="p-2.5 rounded-lg bg-amber-100/90 border border-amber-300 text-amber-950">
                          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                            <FileCheck className="w-4 h-4 text-amber-700" />
                            <span>{day.practicePaper.title}</span>
                          </div>
                          <div className="mt-1 text-[11px] text-amber-900 font-bold">
                            Duration: {day.practicePaper.duration} • Marks: {day.practicePaper.totalMarks}
                          </div>
                          <div className="mt-1 text-[11px] text-amber-800 leading-snug">
                            <strong>Focus: </strong>{day.practicePaper.focus}
                          </div>
                        </div>
                      )}

                      {/* MCQ Target Badge */}
                      <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900">
                        <Target className="w-4 h-4 text-indigo-700 shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">
                            {day.mcqPyqTarget.totalTarget} MCQs Target ({day.mcqPyqTarget.pyqCount} PYQs)
                          </div>
                          <div className="text-[11px] text-slate-600">
                            {day.mcqPyqTarget.breakdown}
                          </div>
                        </div>
                      </div>

                      {/* Primary Revision Task */}
                      <div className="text-xs text-slate-700 leading-relaxed">
                        <strong className="text-slate-900 font-semibold block mb-0.5">
                          Daily Revision Task:
                        </strong>
                        {day.revisionTask.primaryTask}
                      </div>

                      {/* Error book & NCERT action */}
                      <div className="border-t border-slate-100 pt-1 text-[11px] text-slate-600 space-y-0.5">
                        <p>
                          <span className="font-semibold text-rose-700">Error Book: </span>
                          {day.revisionTask.errorBookFocus}
                        </p>
                        <p>
                          <span className="font-semibold text-emerald-700">NCERT: </span>
                          {day.revisionTask.ncertRevision}
                        </p>
                        {day.revisionTask.testSession && (
                          <p className="mt-1 p-1 bg-amber-100/70 border border-amber-200 rounded text-amber-900 font-semibold">
                            ★ {day.revisionTask.testSession}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
