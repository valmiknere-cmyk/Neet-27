import React, { useState, useEffect } from 'react';
import { DaySchedule, DayProgress } from '../types';
import { X, CheckCircle2, Circle, Clock, Target, Award, Play, Pause, RotateCcw, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DayDetailModalProps {
  day: DaySchedule;
  onClose: () => void;
  progress: DayProgress;
  onUpdateProgress: (dayNumber: number, newProgress: DayProgress) => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  day,
  onClose,
  progress,
  onUpdateProgress,
}) => {
  // Local state for notes & mock score
  const [notes, setNotes] = useState(progress?.userNotes || '');
  const [mockScore, setMockScore] = useState<string>(
    progress?.paperScore !== undefined ? String(progress.paperScore) : ''
  );

  // Sync state when day or progress updates
  useEffect(() => {
    setNotes(progress?.userNotes || '');
    setMockScore(progress?.paperScore !== undefined ? String(progress.paperScore) : '');
  }, [day?.dayNumber, progress?.userNotes, progress?.paperScore]);

  // 50-minute Study Timer
  const [timerSeconds, setTimerSeconds] = useState(50 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  if (!day) return null;

  const toggleSubject = (field: keyof DayProgress) => {
    const updated = {
      ...progress,
      [field]: !progress[field],
    };
    onUpdateProgress(day.dayNumber, updated);

    // If all tasks are now done, fire celebration confetti!
    if (
      (field === 'physicsDone' ? !progress.physicsDone : progress.physicsDone) &&
      (field === 'chemistryDone' ? !progress.chemistryDone : progress.chemistryDone) &&
      (field === 'biologyDone' ? !progress.biologyDone : progress.biologyDone) &&
      (field === 'mcqsDone' ? !progress.mcqsDone : progress.mcqsDone) &&
      (field === 'revisionDone' ? !progress.revisionDone : progress.revisionDone)
    ) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleSaveNotes = () => {
    onUpdateProgress(day.dayNumber, {
      ...progress,
      userNotes: notes,
      paperScore: mockScore ? Number(mockScore) : undefined,
    });
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto touch-scroll">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[94vh] sm:max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="p-3.5 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
            <span className="text-lg sm:text-2xl font-black tracking-tight text-white">
              {day.dayLabel}
            </span>
            <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-700">
              Phase {day.phase}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              W{day.week}
            </span>
            {day.practicePaper && (
              <span className="flex items-center gap-1 text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                <FileCheck className="w-3.5 h-3.5" />
                Paper {day.practicePaper.paperNumber}/20
              </span>
            )}
            {day.isMilestoneDay && !day.practicePaper && (
              <span className="flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-purple-400 text-slate-950">
                <Award className="w-3.5 h-3.5" />
                Milestone Test
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body with momentum touch scrolling */}
        <div className="p-3 sm:p-6 overflow-y-auto touch-scroll scrollbar-thin space-y-4">
          {/* Study Timer Bar */}
          <div className="p-2.5 sm:p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Clock className="w-4 h-4 text-indigo-700 shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-indigo-950 uppercase tracking-wide">
                Study Sprint:
              </span>
              <span className="font-mono text-sm sm:text-base font-black text-indigo-900">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => setTimerActive(!timerActive)}
                className="p-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer active:scale-95"
                title={timerActive ? 'Pause' : 'Start 50-min study sprint'}
              >
                {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setTimerActive(false);
                  setTimerSeconds(50 * 60);
                }}
                className="p-1.5 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs transition-colors cursor-pointer active:scale-95"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Full-Length Practice Paper Section if present */}
          {day.practicePaper && (
            <div className="p-4 rounded-xl border-2 border-amber-400 bg-amber-50/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-amber-800" />
                  <h3 className="font-black text-xs uppercase tracking-wider text-amber-950">
                    FULL-LENGTH NEET PRACTICE PAPER {day.practicePaper.paperNumber} / 20
                  </h3>
                </div>
                <span className="text-xs font-extrabold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
                  {day.practicePaper.totalMarks} Marks • 180 Qs
                </span>
              </div>

              <h4 className="text-base font-extrabold text-amber-950">{day.practicePaper.title}</h4>
              <p className="text-xs text-amber-900">
                <strong>Duration & Timing: </strong>{day.practicePaper.duration}
              </p>
              <p className="text-xs text-amber-900">
                <strong>Exam Strategy Focus: </strong>{day.practicePaper.focus}
              </p>
              <div className="text-xs text-amber-950 bg-white p-2.5 rounded-lg border border-amber-300">
                <strong>Post-Paper Audit Task: </strong>{day.practicePaper.analysisTask}
              </div>

              {/* Mock Score Input */}
              <div className="pt-2 flex items-center gap-3">
                <label className="text-xs font-bold text-amber-950">
                  Your Score (out of 720):
                </label>
                <input
                  type="number"
                  min="0"
                  max="720"
                  value={mockScore}
                  onChange={(e) => setMockScore(e.target.value)}
                  placeholder="e.g. 645"
                  className="w-24 px-2 py-1 bg-white border border-amber-300 rounded text-xs font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* 1. Physics Deep-Dive */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="font-black text-xs uppercase tracking-wider text-blue-900">
                  PHYSICS SESSION
                </h3>
              </div>
              <button
                onClick={() => toggleSubject('physicsDone')}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 cursor-pointer"
              >
                {progress?.physicsDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
                <span>{progress?.physicsDone ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>

            <h4 className="text-base font-bold text-slate-900">{day.physics.topic}</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Core Concept: </strong>
              {day.physics.classConcept}
            </p>
            <div className="text-xs text-blue-950 bg-white p-2.5 rounded-lg border border-blue-100">
              <strong>Numerical Practice & Target: </strong>
              {day.physics.practice} ({day.physics.mcqCount} Questions)
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {day.physics.subtopics.map((sub, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-blue-100/70 text-blue-900 rounded font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Chemistry Deep-Dive */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h3 className="font-black text-xs uppercase tracking-wider text-indigo-900">
                  CHEMISTRY SESSION
                </h3>
              </div>
              <button
                onClick={() => toggleSubject('chemistryDone')}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 cursor-pointer"
              >
                {progress?.chemistryDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
                <span>{progress?.chemistryDone ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>

            <h4 className="text-base font-bold text-slate-900">{day.chemistry.topic}</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Core Concept: </strong>
              {day.chemistry.classConcept}
            </p>
            <div className="text-xs text-indigo-950 bg-white p-2.5 rounded-lg border border-indigo-100">
              <strong>Practice & Target: </strong>
              {day.chemistry.practice} ({day.chemistry.mcqCount} Questions)
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {day.chemistry.subtopics.map((sub, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-indigo-100/70 text-indigo-900 rounded font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Biology Deep-Dive */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <h3 className="font-black text-xs uppercase tracking-wider text-purple-900">
                  BIOLOGY SESSION
                </h3>
              </div>
              <button
                onClick={() => toggleSubject('biologyDone')}
                className="flex items-center gap-1.5 text-xs font-bold text-purple-700 cursor-pointer"
              >
                {progress?.biologyDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
                <span>{progress?.biologyDone ? 'Completed' : 'Mark Done'}</span>
              </button>
            </div>

            <h4 className="text-base font-bold text-slate-900">{day.biology.topic}</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>NCERT Line-by-Line: </strong>
              {day.biology.classConcept}
            </p>
            <div className="text-xs text-purple-950 bg-white p-2.5 rounded-lg border border-purple-100">
              <strong>MCQs & PYQs: </strong>
              {day.biology.practice} ({day.biology.mcqCount} Questions)
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {day.biology.subtopics.map((sub, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-purple-100/70 text-purple-900 rounded font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* 4. MCQ / PYQ & Revision Task */}
          <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-700" />
                <h3 className="font-black text-xs uppercase tracking-wider text-amber-950">
                  MCQ TARGET & REVISION TASK
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSubject('mcqsDone')}
                  className="flex items-center gap-1 text-xs font-bold text-amber-900 cursor-pointer"
                >
                  {progress?.mcqsDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                  <span>MCQs Done</span>
                </button>
                <button
                  onClick={() => toggleSubject('revisionDone')}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-800 cursor-pointer"
                >
                  {progress?.revisionDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                  <span>Revision Done</span>
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-amber-100/80 rounded-lg text-xs font-bold text-amber-950">
              Total Target: {day.mcqPyqTarget.totalTarget} MCQs (including {day.mcqPyqTarget.pyqCount} PYQs)
              <div className="font-normal text-amber-900 mt-0.5">{day.mcqPyqTarget.breakdown}</div>
            </div>

            <div className="text-xs text-slate-800 space-y-1 bg-white p-3 rounded-lg border border-amber-100">
              <p>
                <strong>Revision Task: </strong>
                {day.revisionTask.primaryTask}
              </p>
              <p className="text-rose-900">
                <strong>Error Book Focus: </strong>
                {day.revisionTask.errorBookFocus}
              </p>
              <p className="text-emerald-900">
                <strong>NCERT Revision: </strong>
                {day.revisionTask.ncertRevision}
              </p>
              {day.revisionTask.testSession && (
                <div className="mt-1 p-2 bg-amber-200 text-amber-950 font-bold rounded">
                  ★ {day.revisionTask.testSession}
                </div>
              )}
            </div>
          </div>

          {/* Student's Personal Study Notes for this Day */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
              Personal Study Notes & Doubts for {day.dayLabel}:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record tricky question numbers, formulas forgotten, or quick self-notes..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleSaveNotes}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Save Notes
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
