import React, { useState } from 'react';
import { DaySchedule, DayProgress } from '../types';
import { CheckCircle2, Circle, Award, Target, ChevronDown, ChevronUp, FileCheck } from 'lucide-react';

interface MobileCardViewProps {
  days: DaySchedule[];
  progress: Record<number, DayProgress>;
  onToggleSubject: (dayNumber: number, field: keyof DayProgress) => void;
  onSelectDay: (day: DaySchedule) => void;
}

export const MobileCardView: React.FC<MobileCardViewProps> = ({
  days,
  progress,
  onToggleSubject,
  onSelectDay,
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleExpand = (dayNumber: number) => {
    setExpandedDay((prev) => (prev === dayNumber ? null : dayNumber));
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {days.map((day) => {
        const p = progress[day.dayNumber] || {
          physicsDone: false,
          chemistryDone: false,
          biologyDone: false,
          mcqsDone: false,
          revisionDone: false,
        };

        const isFullyDone =
          p.physicsDone && p.chemistryDone && p.biologyDone && p.mcqsDone && p.revisionDone;

        const isExpanded = expandedDay === day.dayNumber;

        return (
          <div
            key={day.dayNumber}
            id={`day-card-${day.dayNumber}`}
            className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
              day.practicePaper
                ? 'border-amber-400 ring-2 ring-amber-300/60 bg-amber-50/20'
                : day.isMilestoneDay
                ? 'border-purple-300 ring-2 ring-purple-200/50'
                : isFullyDone
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Card Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/70">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xl sm:text-2xl font-black tracking-tight ${
                    isFullyDone ? 'text-emerald-700 line-through' : 'text-slate-900'
                  }`}
                >
                  {day.dayLabel}
                </span>

                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700">
                  Phase {day.phase}
                </span>

                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  W{day.week}
                </span>

                {day.practicePaper && (
                  <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                    Mock {day.practicePaper.paperNumber}/20
                  </span>
                )}

                {day.isMilestoneDay && !day.practicePaper && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
                    <Award className="w-3.5 h-3.5 text-purple-700" />
                    Milestone Day
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectDay(day)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded-md bg-indigo-50 border border-indigo-100 cursor-pointer"
                >
                  Details
                </button>

                <button
                  onClick={() => toggleExpand(day.dayNumber)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
                  aria-label="Toggle details"
                >
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 text-slate-700" />}
                </button>
              </div>
            </div>

            {/* Quick Completion Checklist Bar on Card - Touch Scrollable on Mobile */}
            <div className="px-3 sm:px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto touch-scroll scrollbar-thin">
              <span className="font-bold text-slate-500 text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0 mr-1">
                Daily Check:
              </span>

              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <label className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors active:scale-95">
                  <input
                    type="checkbox"
                    checked={p.physicsDone}
                    onChange={() => onToggleSubject(day.dayNumber, 'physicsDone')}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold whitespace-nowrap ${p.physicsDone ? 'text-blue-700 line-through' : 'text-slate-700'}`}>
                    Physics
                  </span>
                </label>

                <label className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors active:scale-95">
                  <input
                    type="checkbox"
                    checked={p.chemistryDone}
                    onChange={() => onToggleSubject(day.dayNumber, 'chemistryDone')}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold whitespace-nowrap ${p.chemistryDone ? 'text-indigo-700 line-through' : 'text-slate-700'}`}>
                    Chemistry
                  </span>
                </label>

                <label className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors active:scale-95">
                  <input
                    type="checkbox"
                    checked={p.biologyDone}
                    onChange={() => onToggleSubject(day.dayNumber, 'biologyDone')}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold whitespace-nowrap ${p.biologyDone ? 'text-purple-700 line-through' : 'text-slate-700'}`}>
                    Biology
                  </span>
                </label>

                <label className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors active:scale-95">
                  <input
                    type="checkbox"
                    checked={p.mcqsDone}
                    onChange={() => onToggleSubject(day.dayNumber, 'mcqsDone')}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold whitespace-nowrap ${p.mcqsDone ? 'text-amber-700 line-through' : 'text-slate-700'}`}>
                    MCQs
                  </span>
                </label>

                <label className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors active:scale-95">
                  <input
                    type="checkbox"
                    checked={p.revisionDone}
                    onChange={() => onToggleSubject(day.dayNumber, 'revisionDone')}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold whitespace-nowrap ${p.revisionDone ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>
                    Revision
                  </span>
                </label>
              </div>
            </div>

            {/* Card Content: Subjects & Practice */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Practice Paper Spotlight if present */}
              {day.practicePaper && (
                <div className="p-3.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950">
                  <div className="flex items-center gap-2 mb-1">
                    <FileCheck className="w-5 h-5 text-amber-800" />
                    <h4 className="text-sm sm:text-base font-black text-amber-950">
                      {day.practicePaper.title}
                    </h4>
                  </div>
                  <div className="text-xs font-bold text-amber-900 mt-0.5">
                    Duration: {day.practicePaper.duration} • Marks: {day.practicePaper.totalMarks}
                  </div>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    <strong>Focus: </strong>{day.practicePaper.focus}
                  </p>
                  <div className="mt-2 text-xs bg-white/80 p-2 rounded-lg border border-amber-200 text-amber-950">
                    <strong>Post-Paper Task: </strong>{day.practicePaper.analysisTask}
                  </div>
                </div>
              )}

              {/* 1. Physics Section */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/80">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-blue-900">
                      PHYSICS
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                    {day.physics.mcqCount} MCQs Target
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {day.physics.topic}
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  <strong className="text-blue-950 font-semibold">Concept: </strong>
                  {day.physics.classConcept}
                </p>

                <div className="mt-2 text-xs text-blue-950 bg-white/80 p-2 rounded-lg border border-blue-100">
                  <strong className="font-semibold text-blue-900">Practice: </strong>
                  {day.physics.practice}
                </div>

                {isExpanded && day.physics.subtopics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pt-2 border-t border-blue-100">
                    {day.physics.subtopics.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-100/60 text-blue-800 px-2 py-0.5 rounded"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Chemistry Section */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/80">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
                      CHEMISTRY
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                    {day.chemistry.mcqCount} MCQs Target
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {day.chemistry.topic}
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  <strong className="text-indigo-950 font-semibold">Concept: </strong>
                  {day.chemistry.classConcept}
                </p>

                <div className="mt-2 text-xs text-indigo-950 bg-white/80 p-2 rounded-lg border border-indigo-100">
                  <strong className="font-semibold text-indigo-900">Practice: </strong>
                  {day.chemistry.practice}
                </div>

                {isExpanded && day.chemistry.subtopics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pt-2 border-t border-indigo-100">
                    {day.chemistry.subtopics.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs bg-indigo-100/60 text-indigo-800 px-2 py-0.5 rounded"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Biology Section */}
              <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200/80">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                      BIOLOGY
                    </span>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md">
                    {day.biology.mcqCount} MCQs Target
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {day.biology.topic}
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  <strong className="text-purple-950 font-semibold">NCERT Reading: </strong>
                  {day.biology.classConcept}
                </p>

                <div className="mt-2 text-xs text-purple-950 bg-white/80 p-2 rounded-lg border border-purple-100">
                  <strong className="font-semibold text-purple-900">MCQs & PYQs: </strong>
                  {day.biology.practice}
                </div>

                {isExpanded && day.biology.subtopics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pt-2 border-t border-purple-100">
                    {day.biology.subtopics.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs bg-purple-100/60 text-purple-800 px-2 py-0.5 rounded"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. MCQ/PYQ + Revision Section */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950">
                      MCQ/PYQ TARGET + REVISION
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {day.mcqPyqTarget.totalTarget} Total MCQs
                  </span>
                </div>

                <div className="text-xs text-amber-900 mb-2 font-medium">
                  {day.mcqPyqTarget.breakdown}
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-100 space-y-1.5 text-xs sm:text-sm">
                  <p className="text-slate-800">
                    <strong className="text-slate-950 font-bold">Revision Task: </strong>
                    {day.revisionTask.primaryTask}
                  </p>
                  <p className="text-rose-900">
                    <strong className="font-bold">Error-Book Focus: </strong>
                    {day.revisionTask.errorBookFocus}
                  </p>
                  <p className="text-emerald-900">
                    <strong className="font-bold">NCERT Revision: </strong>
                    {day.revisionTask.ncertRevision}
                  </p>
                  {day.revisionTask.testSession && (
                    <div className="mt-2 p-2 rounded bg-amber-100/90 text-amber-950 font-bold border border-amber-300">
                      ★ {day.revisionTask.testSession}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
